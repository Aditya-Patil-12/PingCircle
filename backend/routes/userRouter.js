const express = require("express");
const router = express.Router();

const { showUser,searchUsers } = require("../controller/userController");
const { authenticateUser } = require("../middleware");

router.route("/showMe").get(authenticateUser,showUser);
router.route("/").get(authenticateUser,searchUsers);
module.exports = router;
