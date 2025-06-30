// Model Imports =====================
const { User, Token } = require("../../models");
// Utils ================
const {
  ApiResponse,
  ApiError,
  createTokenPayload,
  attachCookiesToResponse,
} = require("../../utils");
// =======================
const { StatusCodes } = require("http-status-codes");
// External Imports====================
const crypto = require("crypto");
// External Library Imports====================
const { OAuth2Client } = require("google-auth-library");
const { googleLoginConfig } = require("../../.config");
// ============================================


const googleLoginUser = async (req, res) => {
  const { email, profilePic, userName } = req.body;
  // console.log);
  
  if (!email ) {
    throw new ApiError(
      StatusCodes.BAD_REQUEST,
      "Please Provide Values For All Fields"
    );
  }
  let user = await User.findOne({ email });
  console.log(user);
  
  if (!user) {
    console.log("Hey User :::::::", user);
    await User.create({
      userName,
      email,
      password: userName+"@@"+email,
      profilePic,
      phoneNo: "googleLogin",
      socialLoginType: "google",
      isEmailVerified: true,
    });
    user = await User.findOne({ email });
  }
  if( !user.isEmailVerified ){
    user.isEmailVerified = true;
    await user.save();
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
      .json(new ApiResponse(StatusCodes.OK, user, "Login Succesfull"));
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
  return res
    .status(StatusCodes.OK)
    .json(
      new ApiResponse(
        StatusCodes.OK,
        { email: user.email, _id: user._id ,isEmailVerified:true },
        "Login Succesfull"
      )
    );
};


function getAuthenticatedClient({ code }) {
  return new Promise((resolve, reject) => {
    try {
      const oAuth2Client = googleLoginConfig(OAuth2Client);
      const helper = async () => {
        // Now that we have the code, we will use that to acquire tokens.
        const r = await oAuth2Client.getToken(code);
        console.log("tokens we received :::::: ", await r);

        // Make sure to set the credentials on the OAuth2 client.
        oAuth2Client.setCredentials(r.tokens);
        // console.info('Tokens acquired.');
        resolve(oAuth2Client);
      };
      helper();
    } catch (error) {
      reject(error);
    }
  });
}
const googleAuthUser = async (req, res) => {
  const { code } = req.body;
  const oAuth2Client = await getAuthenticatedClient({ code });

  // After acquiring an access_token, you may want to check on the audience, expiration,
  // or original scopes requested.  You can do that with the `getTokenInfo` method.
  // const tokenInfo = await oAuth2Client.getTokenInfo(
  //   oAuth2Client.credentials.access_token
  // );
  // console.log("Getting the Access token Info ", tokenInfo);
  // this uses ClientSecret ....

  const ticket = await oAuth2Client.verifyIdToken({
    idToken: oAuth2Client.credentials.id_token,
    audience: process.env.GOOGLE_CLIENT_ID,
  });
  // console.log("The verification of id token ::", ticket);

  const payload = ticket.getPayload();
  // console.log(payload);
  const { email_verified } = payload;
  if (!email_verified) {
    throw new ApiError(400, "Please verify the email send to register ");
  }

  const { email, picture, name } = payload;
  const userInfo = { email };

  userInfo["profilePic"] = picture;
  userInfo["userName"] = name;
  req.body = userInfo;
  googleLoginUser(req, res);

  return;
};

module.exports = { googleAuthUser, };
//     scope: 'https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile openid',    
