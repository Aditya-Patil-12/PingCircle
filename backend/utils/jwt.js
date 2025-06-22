const jwt = require('jsonwebtoken');
const {ApiError} = require('../utils') 
const createJWT = ({payload,secret})=>{
  // if callback is supplied then it acts asynchronously 
  // jwt.sign(
  //   { foo: "bar" },
  //   privateKey,
  //   { algorithm: "RS256" },
  //   function (err, token) {
  //     console.log(token);
  //   }
  // );
  // Sign Sycnhronous
    const token = jwt.sign(payload, secret);
    return token;
}
const isTokenValid = ( token , whichToken ) => {
  /*
    // if JWT Token is invalid or Secret is Wrong then  - synchronous
    try {
      var decoded = jwt.verify(token, 'wrong-secret');
    } catch(err) {
      // err
    }
  */try {
    // this is a synchronous way of doing it
    const payload = jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    throw new ApiError(500,`${whichToken} token verifying Led to Error`);
  }
};
const attachCookiesToResponse = ({ res, payload, refreshToken}) => {
    const accessTokenJWT = createJWT({
      payload: payload,
      secret: process.env.ACCESS_TOKEN_SECRET,
    });
    const refreshTokenJWT = createJWT({
      payload: { payload, refreshToken },
      secret: process.env.REFRESH_TOKEN_SECRET,
    });
    // const oneDay = 1000*60*60*24 ;
    const twoMintutes = 1000*60*2;
    const threeMintutes = 1000*60*3;
    res.cookie("accessToken", accessTokenJWT, {
      httpOnly: true,
      expires: new Date(Date.now() + twoMintutes),
      secure: (process.env.NODE_ENV === "production"),
      signed: true,
    });
    res.cookie("refreshToken", refreshTokenJWT, {
      httpOnly: true,
      expires: new Date(Date.now() + threeMintutes),
      secure: (process.env.NODE_ENV === "production"),
      signed: true,
    });
};

const expireCookie = ({ res }) => {
  const expiryTimeForToken = 1000;
  res.cookie("accessToken", "accessTokenLogout", {
    httpOnly: true,
    expires: new Date(Date.now() + expiryTimeForToken),
  });
  res.cookie("refreshToken", "refreshTokenLogout", {
    httpOnly: true,
    expires: new Date(Date.now() + expiryTimeForToken),
  });
};

module.exports = {
  createJWT,
  isTokenValid,
  attachCookiesToResponse,
  expireCookie,
};
  