// Model Imports =====================
const { User, Token } = require("../models");
const {
  createHash,
  ApiResponse,
  ApiError,

  createTokenPayload,
  expireCookie,

  sendEmail,
  sendVerificationEmailLink,

  uploadOnCloudinary,
  deleteFile,
} = require("../utils");
const { StatusCodes } = require("http-status-codes");
const { attachCookiesToResponse } = require("../utils");
const {googleAuthUser} = require('../controller/socialLoginController')

// External Imports====================
const crypto = require("crypto");
// ====================================
// TODO : Is to verify the email
const registerUser = async (req, res) => {
  console.log("the body", req.body);
  // console.log("Second time checking this",req.file);
  // if we given options then extra property like
  // destination , filename , path
  // Second time checking this {
  //   fieldname: 'profilePic',
  //   originalname: 'computer-2.jpeg',
  //   encoding: '7bit',
  //   mimetype: 'image/jpeg',
  //   destination: './public/uploads',
  //   filename: '1750608348105-computer-2.jpeg',
  //   path: 'public\\uploads\\1750608348105-computer-2.jpeg',
  //   size: 52662
  // }
  // userId - filename
  const { userName, email, phoneNo, password, confirmPassword } = req.body;
  // console.log(req.body, " ", req.file);

  
  if (!userName || !email  || !password || !confirmPassword  || !phoneNo) {
    throw new ApiError(StatusCodes.BAD_REQUEST, "Please Provide All Fields ");
  }
  if (password !== confirmPassword) {
    throw new ApiError(
      StatusCodes.BAD_REQUEST,
      "Password and Confirm Password Does Not Match"
    );
  }
  const isUserAlreadyRegistered = await User.findOne({ email });
  if (isUserAlreadyRegistered) {
    // conflicts -> current state -> server.
    throw new ApiError(
      StatusCodes.CONFLICT,
      "User with username or email already exists"
    );
  }

  let profilePicCloudinary = await uploadOnCloudinary(req.file.path, {
    // public_id : req.file.filename,
    // use_filename:true,
    // unique_filename:true,
    use_filename: true,
    unique_filename: false,
  });

  // create User .....
  const user = await User.create({
    userName,
    email,
    phoneNo,
    password,
    profilePic: profilePicCloudinary.secure_url,
  });
  console.log("here we are before saving ");
  await deleteFile(req.file.path);
  // await user.save();
  const newlyCreatedUser = await User.findById(user._id)
  .select(
    "email _id isEmailVerified");
  if (!newlyCreatedUser) {
    throw new ApiError(
      StatusCodes.INTERNAL_SERVER_ERROR,
      "Something went wrong afer creating and accessing the user from DB"
    );
  }
  return res
    .status(StatusCodes.CREATED)
    .json(
      new ApiResponse(200, newlyCreatedUser, "User Registered Successfully")
    );
};
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new ApiError(
      StatusCodes.BAD_REQUEST,
      "Please Provide Values For All Fields"
    );
  }
  const id = "";
  let user = await User.findOne({ email: email });

  if (!user) {
    if (process.env.NODE_ENV === "development") {
      throw new ApiError(StatusCodes.NOT_FOUND, "User does not exist");
    }
    throw new ApiError(StatusCodes.UNAUTHORIZED, "Invalid Credentials");
  }
  console.log(user);
  
  if (user.socialLoginType != "custom") {
    throw new ApiError(StatusCodes.BAD_REQUEST, "Please Register First");
  }
  // TODO : please verify email =======
  // Check if password Matches or not
  // the error over here when i fetched user .select('-password) so no password ....
  const checkPassword = await user.isPasswordCorrect(password);
  console.log("Check if the password is correct or not ", checkPassword);
  if (!checkPassword) {
    if (process.env.NODE_ENV === "development") {
      throw new ApiError(StatusCodes.UNAUTHORIZED, "Password Incorrect");
    }
    throw new ApiError(StatusCodes.UNAUTHORIZED, "Invalid Credentials");

  }
  const userTokenPayload = createTokenPayload(user);
  let refreshToken = "";
  // check for refresh Token .....
  const existingToken = await Token.findOne({ userId: user._id });

  // if user comes to login Page and re enters the credentials and they are valid then we should renew access Token
  // refreshToken is not refreshed and
  if (existingToken) {
    // isValid
    const { isValid } = existingToken;
    if (!isValid) {
      // Unauthenticated Error . ==>Invalid Credentails
      throw new ApiError(StatusCodes.UNAUTHORIZED, "Invalid Credentials");
    }
    refreshToken = existingToken.refreshToken;

    attachCookiesToResponse({ res, payload: userTokenPayload, refreshToken });
    return res
      .status(StatusCodes.OK)
      .json(
        new ApiResponse(
          StatusCodes.OK,
          { userName:user.userName, email: user.email, _id:user._id },
          "Login Succesfull"
        )
      );
  }
  refreshToken = crypto.randomBytes(40).toString("hex");
  const userAgent = req.headers["user-agent"];
  const ip = req.ip;
  const userToken = {
    refreshToken,
    userAgent,
    ip,
    userId: user._id,
  };
  await Token.create(userToken);
  attachCookiesToResponse({ res, payload: userTokenPayload, refreshToken });
  const { userName, email: userEmail, _id } = user;
  console.log("This the information to be sent ", { userName, email: userEmail, _id });
  
  return res
    .status(StatusCodes.OK)
    .json(
      new ApiResponse(
        StatusCodes.OK,
        { userName, email: userEmail, _id },
        "Login Succesfull"
      )
    );
};
const showMeUser = async (req, res) => {
  if( !req ) {
    throw new ApiError(400, "No req in showMe User controller");
  }
  if( !(req.user) ) {throw new ApiError(400,"No req.user in showMe User controller");}
  const {userId} = req.user;
  if( !userId ){
    throw new ApiError(400,"Not A Valid Token");
  }
  const user = await User.findById({ _id: userId }).select(
    "_id email userName isEmailVerified"
  );
  if( !user ){
    throw new ApiError(400,"Not A Valid User");
  }
  return res.status(StatusCodes.OK).json(new ApiResponse(200,user,"User Exists"));
}

const logoutUser = async (req, res) => {
  // Protect the route
  // if user is Valid then and only the we need to logout User
  expireCookie({ res });
  return res
    .status(StatusCodes.OK)
    .json(new ApiResponse(200, "Logout Succesfull"));
};

const forgotPassword = async (req, res) => {
  const { email } = req.params;
  if (!email) {
    throw new ApiError(StatusCodes.BAD_REQUEST, "Please Provide Email");
  }
  const user = await User.findOne({ email: email });
  if (user) {
    sendVerificationEmailLink({verify:"password",email:email,user});
    await user.save();
  }
  res
    .status(200)
    .json(
      new ApiResponse(200, "Please Check Email For Resetting the Password")
    );
};



const verifyEmail = async (req,res)=>{
  // send Mail .....
  const {email} = req.params;
  if( !email ) throw new ApiError(400,"Please Register First")
  const user = await User.findOne({email});
  if( !user){
    return new ApiError(400,'User does not exists');
  }
  // TODO : Email of req.user == query email


  const emailVerificationToken = crypto.randomBytes(70).toString("hex");

  console.log("the unhashed Token is:::::",emailVerificationToken);
  const subject = "Verify Email";
  const origin = process.env.CORS_ORIGIN;
  const msg = `<h3>Please click on this link below to verify to Email</h3><a href =\"${origin}/auth/verifyField?verify=email&email=${email}&token=${emailVerificationToken}\"> Verify Email</a>`;

  sendEmail({email:"aditypatil71@gmail.com",message:msg,subject})


  const tenMinutes = 1000 * 60 * 10;
  user.verificationToken = createHash(emailVerificationToken);
  const verificationTokenExpirationDate = new Date(Date.now() + tenMinutes);
  user.verificationTokenExpirationDate = verificationTokenExpirationDate;

  console.log("This the hashed Token", user.verificationToken);

  await user.save();

  return res.status(200).json(new ApiResponse(StatusCodes.OK,[],"Please Check Email Verification Link sent"));
}
// IT WILL BE POST
const verificationFieldToken = async (req, res) => {
  const { verify,email,token } = req.query;
  console.log(req.query," ",req.body);
  if (!token || !email || !verify) {
    throw new ApiError(
      StatusCodes.BAD_REQUEST,
      "Something among Token, Verify, Password, is Missing "
    );
  }
  let message = "";
  const user = await User.findOne({ email });
  if (user) {
    console.log(user.verificationToken === createHash(token));
    console.log(user.verificationTokenExpirationDate > Date.now());
      if (!(user.verificationToken === createHash(token) && user.verificationTokenExpirationDate > Date.now())) {
        return res
          .status(400)
          .json(
            new ApiResponse(
              StatusCodes.BAD_REQUEST,
              [],
              "Please Relogin to Generate a new Email Verification Link"
            )
          );
      }
      if (verify == "email") {
        const {isEmailVerified} = req.body;
        if( !isEmailVerified ){
          return res
            .status(400)
            .json(
              new ApiResponse(
                StatusCodes.BAD_REQUEST,
                [],
                "Please Provide isEmailVerified to be verify"
              )
            );
        }
        user.isEmailVerified = isEmailVerified;
      }
      else if( verify == "password" ){
        const {password} = req.body;
        if( !password ){
          return res
          .status(400)
          .json(
            new ApiResponse(
              StatusCodes.BAD_REQUEST,
              [],
              "Please Give Password to be reset"
            )
          );
        }
        user.password = password;
      }
      user.verificationToken = null;
      user.verificationTokenExpirationDate = null;
      await user.save();
  }
  if( verify == "email" ) message = "Email Verification Successfully";
  else if( verify == "password" ) message = "Password Changed Successfully";
  return res
    .status(StatusCodes.OK)
    .json(new ApiResponse(StatusCodes.OK, message));
};

const socialLoginUser = async (req,res) =>{
  const { socialType } = req.params;

  if( (socialType === "google") ){
    googleAuthUser(req,res);
  }
  return ;
}

module.exports = {
  registerUser,
  loginUser,
  logoutUser,
  showMeUser,
  forgotPassword,

  socialLoginUser,
  verifyEmail,
  verificationFieldToken,
  // googleAuthUser,
};
