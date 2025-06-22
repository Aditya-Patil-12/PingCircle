const express = require('express');
const router = express.Router();

const {
  loginUser,
  logoutUser,
  registerUser,
  forgotPassword,
  resetPassword,
} = require("../controller/authController");
const {upload} = require("../middleware/");

router.route('/register').post(upload.single('profilePic'),registerUser);
router.route('/login').post(loginUser);
router.route('/logout').get(logoutUser);
router.route('/forgot-password').post(forgotPassword);
router.route('/reset-password').post(resetPassword);

module.exports = router;