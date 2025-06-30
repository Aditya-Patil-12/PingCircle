const express = require("express");
const router = express.Router();

const {
  loginUser,
  logoutUser,
  registerUser,
  forgotPassword,
  socialLoginUser,
  verifyEmail,
  verificationFieldToken,
  showMeUser,
} = require("../controller/authController");
const {
  googleAuthUser,
} = require("../controller/socialLoginController/googleAuthController");
const { upload } = require("../middleware/");
const {authenticateUser} = require('../middleware');
router.route("/register").post(upload.single("profilePic"), registerUser);
router.route("/login").post(loginUser);
router.route("/logout").get(logoutUser);
router.route("/showMe").get(authenticateUser,showMeUser);
router.route("/forgot-password/:email").get(forgotPassword);
router.route("/socialLogin/:socialType").post(socialLoginUser);
router.route("/verifyEmail/:email").get(verifyEmail);
router.route("/verifyFieldToken").post(verificationFieldToken);
module.exports = router;
