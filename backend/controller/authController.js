// Model Imports =====================
const {User,Token} = require('../models');
const {createHash,ApiResponse,ApiError} = require('../utils'); 
const {StatusCodes} =require('http-status-codes');
// External Imports====================
const crypto = require('crypto'); 
// =============================
const registerUser = async (req,res)=>{
    const {userName,email,phoneNo,password,confirmPassword} = req.body;
    console.log(req.body);
    
    if (!userName || !email || !phoneNo || !password || !confirmPassword) {
      throw new ApiError(StatusCodes.BAD_REQUEST, "Please Provide All Fields ");
    }
    if( password !== confirmPassword ){
        throw new ApiError(
          StatusCodes.BAD_REQUEST,
          "Password and Confirm Password Does Not Match"
        );
    }
    const isUserAlreadyRegistered = await User.findOne({ph:12});
    if( isUserAlreadyRegistered ){
      // conflicts -> current state -> server.
      throw new ApiError(
        StatusCodes.CONFLICT,
        "User with username or email already exists"
      );
    }
    
    // create User .....
    const user  = await User.create({
        userName,
        email,
        phoneNo,
        password,
    });

    const newlyCreatedUser = await User.findById(user._id).select("-password");

    if( !newlyCreatedUser ){
        throw new ApiError(
          StatusCodes.INTERNAL_SERVER_ERROR,
          "Something went wrong afer creating and accessing the user from DB"
        );
    }
    // on res we need to attach cookies
    
    return res.status(StatusCodes.CREATED).json(new ApiResponse(200,newlyCreatedUser,"User Registered Successfully"));
} 
const loginUser = async (req,res)=>{
    const {email,password} = req.body;
    if( !email || !password ) {
        return res.status(401).json({
            msg:"Not Authorized"
        });
    }
    const id ='';
    const user = await User.findById(id).select('-password');

    if( !doesUserExists ){
        return res.status(401).json({
          msg: "Please Register",
        });
    }

    // TODO : please verify email =======
    let refreshToken = '';
    // check for refresh Token .....
    const existingToken = await Token.findOne({user:id});

    if( existingToken ){
        // isValid
        const {isValid} = existingToken;
        if( !isValid ){
            // thro
            // Unauthenticated Error . ==>Invalid Credentails
        }
        refreshToken = existingToken.refreshToken;
    }
    refreshToken = crypto.randomBytes(40).toString('hex');

    const userAgent = req.headers['user-agent'];
    const ip = req.ip;

    const userToken = {
        refreshToken,
        userAgent,
        ip,
    };

    const token = await Token.create(userToken);


    res.status(400).json({
        user
    })
}
const logoutUser = async (req,res)=>{
    console.log("Logout User");
} 


const forgotPassword = async (req,res) =>{
    const {email} = req.body;
    if( !email ){
        // throw new Error
        // return ;
    }
    const user = await User.findOne({email:email}); 
    if( user ){
        const passwordToken = crypto.randomBytes(70).toString('hex');
        
                // call the function to check the email ....
                // while sending email it should be plain

        const tenMinutes = 1000*60*10;
        const passwordTokenExpirationDate = new Date(Date.now() + tenMinutes);
        user.passwordToken = createHash(passwordToken);
        user.passwordTokenExpirationDate = passwordTokenExpirationDate;
        await user.save();

    }
    // if no user then also OK 
    res.status(200).json({msg:'Please Check Email for Verification'});
}
const resetPassword = async (req,res)=>{
    const {token, email , password } = req.body;
    if( !token || !email || !password  ){

    }
    const user = await User.findOne({email});

    if( user ){
        const currentDate = new Date();
        if( 
    user.passwordToken === createHash (token) &&
            user.passwordTokenExpirationDate > currentDate ){
                user.password = password;
                user.passwordToken = null;
                user.passwordTokenExpirationDate=null;
                await user.save();
            }
    }
};

module.exports = {
  registerUser,
  loginUser,
  logoutUser,
  forgotPassword,
  resetPassword,
};