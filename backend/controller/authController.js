// Model Imports =====================
const { User, Token } = require("../models");
const {
  createHash,
  ApiResponse,
  ApiError,

  createTokenPayload,
  expireCookie,

  sendEmail,

  uploadOnCloudinary
} = require("../utils");
const { StatusCodes } = require("http-status-codes");
const { attachCookiesToResponse } = require("../utils");
// External Imports====================
const crypto = require("crypto");
// =============================
// TODO : Is to verify the email
const registerUser = async (req, res) => {
  console.log("the body",req.body);
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
  console.log(req.body);

  if (!userName || !email || !phoneNo || !password || !confirmPassword) {
    throw new ApiError(StatusCodes.BAD_REQUEST, "Please Provide All Fields ");
  }
  if (password !== confirmPassword) {
    throw new ApiError(
      StatusCodes.BAD_REQUEST,
      "Password and Confirm Password Does Not Match"
    );
  }
  const isUserAlreadyRegistered = await User.findOne({email});
  if (isUserAlreadyRegistered) {
    // conflicts -> current state -> server.
    throw new ApiError(
      StatusCodes.CONFLICT,
      "User with username or email already exists"
    );
  }


  const profilePicCloudinary = await uploadOnCloudinary(req.file.path, {
    // public_id : req.file.filename,
    // use_filename:true,
    // unique_filename:true,
    use_filename: true,
    unique_filename: false,
  })


  // create User .....
  const user = await User.create({
    userName,
    email,
    phoneNo,
    password,
    profilePic: profilePicCloudinary.secure_url,
  });
  console.log("here we are before saving ");
  
  // await user.save();
  const newlyCreatedUser = await User.findById(user._id).select("-password");

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

  // TODO : please verify email =======
  // Check if password Matches or not
  // the error over here when i fetched user .select('-password) so no password ....
  const checkPassword = await user.isPasswordCorrect(password);  
  console.log("Check if the password is correct or not " , checkPassword);
  if (!checkPassword) {
    if (process.env.NODE_ENV === "development") {
      throw new ApiError(StatusCodes.UNAUTHORIZED, "Password Incorrect");
    }
    throw new ApiError(StatusCodes.UNAUTHORIZED, "Invalid Credentials");
  }
  const userTokenPayload = createTokenPayload(user);
  let refreshToken = "";
  // check for refresh Token .....
  const existingToken = await Token.findOne({ user: user._id });

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
      .json(new ApiResponse(StatusCodes.OK, user, "Login Succesfull"));
  }
  refreshToken = crypto.randomBytes(40).toString("hex");
  const userAgent = req.headers["user-agent"];
  const ip = req.ip;
  const userToken = {
    refreshToken,
    userAgent,
    ip,
    user:user._id,
  };
  await Token.create(userToken);
  attachCookiesToResponse({ res, payload: userTokenPayload, refreshToken });
  const {userName,email:userEmail,_id} = user;
  return res
    .status(StatusCodes.OK)
    .json(new ApiResponse(StatusCodes.OK, {userName,email:userEmail,_id}, "Login Succesfull"));
};

const logoutUser = async (req, res) => {
  // Protect the route 
  // if user is Valid then and only the we need to logout User
   expireCookie({res});
   return res.status(StatusCodes.OK).json(
    new ApiResponse(200,"Logout Succesfull")
   )
};

const forgotPassword = async (req, res) => {
  const { email } = req.body;
  if (!email) {
    // throw new Error
    // return ;
    throw new ApiError(StatusCodes.BAD_REQUEST,'Please Provide Email');
  }
  const user = await User.findOne({ email: email });
  if (user) {
    const passwordToken = crypto.randomBytes(70).toString("hex");
    console.log("This the token sent :::" , passwordToken);
    
    // call the function to check the email ....
    // while sending email it should be plain

    await sendEmail({token:passwordToken,email:email})
    const tenMinutes = 1000 * 60 * 10;
    const passwordTokenExpirationDate = new Date(Date.now() + tenMinutes);
    user.passwordToken = createHash(passwordToken);
    user.passwordTokenExpirationDate = passwordTokenExpirationDate;
    console.log("This the hashed Token",user.passwordToken);
    await user.save();
  }
  // if no user then also OK
  res.status(200).json(new ApiResponse(200,"Please Check Emaill For Resetting the Password"));
};

const resetPassword = async (req, res) => {
  const { token, email, password } = req.body;
  console.log(req.body);
  
  if (!token || !email || !password) {
    throw new ApiError(StatusCodes.BAD_REQUEST, "Something among Token, Email, Password, is Missing ");
  }
  const user = await User.findOne({ email });
  if (user) {
    if (
      (user.passwordToken === createHash(token)) &&
      (user.passwordTokenExpirationDate > Date.now())
    ) {
      console.log("Hello hey password is assigned");
      user.password = password;
      user.passwordToken = null;
      user.passwordTokenExpirationDate = null;
      await user.save();
    }
    
  }
  return res
    .status(StatusCodes.OK)
    .json(new ApiResponse(StatusCodes.OK, "Password Reset Succesfully"));
};

module.exports = {
  registerUser,
  loginUser,
  logoutUser,
  forgotPassword,
  resetPassword,
};
