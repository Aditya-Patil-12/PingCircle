const express = require("express");
const router = express.Router();

const { sendMessage,fetchMessageForAChat } = require("../controller/messageController");
const { authenticateUser } = require("../middleware");

router.route("/:chatId").post(authenticateUser, sendMessage);
router.route("/:chatId").get(authenticateUser, fetchMessageForAChat);
module.exports = router;