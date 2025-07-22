const express = require("express");
const router = express.Router();

const {
  createChat,
  deleteChat,
  getChat,
  updateChat,
  modifyGroupMembers,
  modifyGroupAdmins,
  exitChat,
} = require("../controller/chat/chatController");
const createSelfChat = require('../controller/chat/selfChatController');
const { authenticateUser } = require("../middleware");

// 1) Create A Route .....
router.route("/").post(authenticateUser,createChat);
router.route("/self").post(authenticateUser, createSelfChat);
router.route("/:chatId").delete(authenticateUser ,deleteChat);
router.route("/:chatId").get(authenticateUser,getChat);
router.route("/:chatId").patch(authenticateUser,updateChat);

// oneWay Exit ==>
router.route("/:chatId/exit/").delete(authenticateUser, exitChat);
// group Chat Routes 
router.route("/:chatId/members").post(authenticateUser,modifyGroupMembers);
router.route("/:chatId/admins/").post(authenticateUser,modifyGroupAdmins);

module.exports = router;

