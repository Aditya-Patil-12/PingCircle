const jwt = require('jsonwebtoken');
const createJWT = ({payload})=>{
    const token = jwt.sign(payload,process.env.ACCESS_TOKEN_SECRET);


    return token;
}
// change it
const isTokenValid = ({ token }) => {
  return jwt.verify(token, process.env.JWT_SECRET);
};
const attachCookiesToResponse = ({ res, payload, refreshToken}) => {
    const accessTokenJWT = createJWT({ payload: payload });;
    const refreshTokenJWT = createJWT({ 
        payload: {payload , refreshToken} });

  const token = createJWT({ payload: payload });

        // 10 minutes ...
//   const COOKIE_LIFETIME = 1000 * 60 * 60*24;
const oneDay = 1000*60*50*24 ;
  res.cookie("accessToken", accessTokenJWT, {
    httpOnly: true,
    // expires: new Date(Date.now() + COOKIE_LIFETIME),
    secure: process.env.NODE_ENV === "production",
    signed: true,
    // 1sec
    maxAge:1000,
  });
  res.cookie("refreshToken", refreshTokenJWT, {
    httpOnly: true,
    expires: new Date(Date.now() +oneDay),
    secure: process.env.NODE_ENV === "production",
    signed: true,
  });
};

const expireCookie = ({ res }) => {
  res.cookie("token", "logout", {
    httpOnly: true,
    expires: new Date(Date.now() + 10 * 1000),
  });
};
module.exports = {
  createJWT,
  isTokenValid,
  attachCookiesToResponse,
  expireCookie,
};
  