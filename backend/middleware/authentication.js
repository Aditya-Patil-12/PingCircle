const {Token, User} = require('../models');
const {
  ApiError,
  createTokenPayload,
  attachCookiesToResponse,
  isTokenValid,
} = require("../utils");
const authenticateUser = async (req, res, next) => {
  
  const { refreshToken,accessToken } = req.signedCookies;
  // console.log(refreshToken," ",accessToken);
  try {
    if( accessToken ){
      const payload = isTokenValid(accessToken, "accessToken");
      // console.log("the Access token :::::::::: ",payload);
      
      req.user = payload;
      next();
      return ;
    }
    if( !refreshToken ){
      throw new ApiError(400,"Please Login");
    }
    let payload = isTokenValid(refreshToken,"refreshToken");
    // console.log(refreshToken);
    
    const existingToken = await Token.findOne({userId:payload.userId,
        refreshToken : payload.refreshToken,
    });
    if( (!existingToken) || (!existingToken?.isValid) ){
        // throw an error ....
        throw new ApiError("Please Login Again !!!");
    }
    const user  = await User.findOne({_id:payload.userId});
    payload = createTokenPayload(user); 
    // console.log("Checking The Payload",payload);
    
    req.user= payload;
    // attachCookiesToResponse({res,payload,refreshToken:payload.refreshToken});
    next();
  } catch (error) {
    throw error;
  }
};

module.exports =authenticateUser;
