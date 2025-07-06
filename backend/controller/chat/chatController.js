const { Chat  } = require("../../models");
const {
  ApiError,
  ApiResponse,
  checkForGroupAdmin,
  checkForGroupMember,
} = require("../../utils");

const {
  createGroupChat,
  updateGroupChat,
  modifyGroupMembers,
  modifyGroupAdmins,
  exitGroupChat,
} = require("./groupChatController");
const {
  createOneToOneChat,
  exitOneToOneChat,
} = require("./oneToOneChatController");
const { deleteAllMessageInAChat } = require("../messageController");
const { deleteAChatOfUser,updateAChatOfUser } = require("../userController");
// check if chat Name is Unique or not ......
// i/p ==>  isGroupChat grpMembers

const createChat = async (req, res) => {
  const { userId } = req.user;

  // we will have user ....
  const { isGroupChat } = req.body;
  console.log(isGroupChat);
  
  if (!isGroupChat) {
    createOneToOneChat(req,res);
    return ;
  }
  createGroupChat(req,res);
  return ;
};

const deleteChat = async (req, res) => {
  const { userId } = req.user;
  const { chatId } = req.params;
  console.log(chatId);
  
  const deleteChat = await Chat.findById(chatId);
  if (!deleteChat) {
    throw new ApiError(400, "There Does not Exists Such Group");
  }
  if (deleteChat.chatType == "GroupChat") {
    if (!checkForGroupAdmin(deleteChat.groupAdmins, userId)) {
      return res.status(401).json({
        msg: "Please be a Group Admin",
      });
    }
  }

  // Chat should be deleted from all Users Also ......
  for (let member of deleteChat.members) {
    // User specific Chat ko delete karna hai .....
    await deleteAChatOfUser(member, chatId);
  }

  // delete Message related to a Specific Chat .......
  await deleteAllMessageInAChat(chatId);

  await Chat.findOneAndDelete({ _id: chatId });

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Chat Deleted SuccessFully "));
};
const getChat = async (req, res) => {
  const { userId } = req.user;
  const { chatId } = req.params;
  console.log(chatId);
  
  const chat = await Chat.findById(chatId);
  if (!chat) {
    throw new ApiError(400, "There Does not Exists Such Group");
  }
  if (!checkForGroupMember(chat.members,userId)){
    throw new ApiError(401,"Please Be A Member of Group ");
  }
  await chat.populate({
    path: "members",
    select: "userName email phoneNo profilePic chats",
  });
  return res
    .status(200)
    .json(new ApiResponse(200, chat, "Chat Deleted SuccessFully "));
};
const updateChat = async (req, res) => {
  const { userId } = req.user;
  const { chatId } = req.params;
  console.log(chatId);

  const updateChat = await Chat.findById(chatId);
  console.log(updateChat);
  
  if (!updateChat) {
    throw new ApiError(400, "There Does not Exists Such Group");
  }
  if (updateChat.chatType == "GroupChat") {
    if (!checkForGroupAdmin(updateChat.groupAdmins, userId)) {
      return res.status(401).json({
        msg: "Please be a Group Admin",
      });
    }
    // users update   .....
    // message update .....

    updateGroupChat(req,res);
    return ;
  }

  return ;
};

const exitChat = async (req,res) =>{
  const {chatId} =  req.params;
  const existingChat = await Chat.findById(chatId);
  console.log(existingChat);
  
  if( existingChat.chatType == "GroupChat" ){
    await exitGroupChat(req, res);
    return ;
  } 
  else if (existingChat.chatType == "OneToOneChat") {
    await exitOneToOneChat(req,res);
  }
  return ;
}
module.exports = {
  createChat,
  deleteChat,
  getChat,
  updateChat,
  modifyGroupMembers,
  modifyGroupAdmins,
  exitChat,
};
