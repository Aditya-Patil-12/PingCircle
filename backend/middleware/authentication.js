// const CustomError = require("../errors");
const { isTokenValid } = require("../utils/jwt");
const {Token} = require('../models');
const {attachCookiesToResponse} = require('../');
const authenticateUser = async (req, res, next) => {
  const { refreshToken,accessToken } = req.signedCookies;

  try {
    if( accessToken ){
        const payload = isTokenValid(accessToken);
        req.user = payload.user ;
        return next();
    }
    const payload = isTokenValid(refreshToken);
    const existingToken = await Token.findOne({user:payload.user.userId,
        refreshToken : payload.refreshToken,
    });

    if( !existingToken || !existingToken?.isValid ){
        // throw an error ....
    }
    attachCookiesToResponse();
    req.user = payload.user;
    next();
  } catch (error) {
    // throw new Error();
  }
};

const authorizePermissions = (...roles) => {
  // console.log("in authorizePermissions",roles);

  return (req, res, next) => {
    // console.log(roles);

    const userRole = req.user.role;

    const findIndex = roles.findIndex((role) => role === userRole);
    console.log(findIndex, " ");

    if (findIndex == -1) {
      throw new CustomError.UnauthorizedError(
        `Unauthorized to Access this route`
      );
    }
    next();
  };
};
const authorizeProduct = (req, res, next) => {
  const { token } = req.signedCookies;
  // this is the only difference
  if (!token) return;
  try {
    const { name, userId, role } = isTokenValid({ token });
    req.user = { name, userId, role };
    //   console.log(req.user);
  } catch (error) {
    throw new CustomError.UnauthenticatedError("No Token Not Valid");
  }
  next();
};
module.exports = { authenticateUser, authorizePermissions, authorizeProduct };
