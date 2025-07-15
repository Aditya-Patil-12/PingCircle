const {Message,Chat} = require('../models')
const {checkForGroupMember} = require('../utils')
console.log(checkForGroupMember);

// here this thing creates circular imports ===>
// const{getChatHelper} = require('./chat/chatController')

const {ApiResponse} = require('../utils');


const deleteAllMessageInAChat = async (chatId) =>{
    // const messages =await Message.find({
    //     chatId 
    // });
    // for(let message of messages ){
    //     await Message.
    // }
    await Message.deleteMany({chatId})
    return ;
} 
const deleteAllMessagesofAUserInAChat = async (chatId,userId) =>{
    await Message.deleteMany({
      chatId,
      sender:userId,
    }); 
}

const getChatHelper = async (userId, chatId) => {
  console.log(chatId);

  const chat = await Chat.findById(chatId);
  if (!chat) {
    throw new ApiError(400, "There Does not Exists Such Group");
  }
  if (!checkForGroupMember(chat.members, userId)) {
    throw new ApiError(401, "Please Be A Member of Group ");
  }
  await chat.populate({
    path: "members",
    select: "userName email phoneNo profilePic chats",
  });
  return chat;
};
// update Message .....
const sendMessage = async (req,res) =>{
  const { userId  } = req.user;
  const { chatId  } =req.params;
  const { content } = req.body;
  // if (!content) {
  //   throw new ApiError(400, "Please Send the Content of Message");
  // }
  const chat = await getChatHelper(userId,chatId);
  const newMessage =  await Message.create({
    sender: userId,
    chatId,
    content,
  });
  // console.log(newMessage);
  // await newMessage;
  console.log(newMessage);
  await newMessage.populate({
    path: "sender",
    select: "userName email phoneNo profilePic",
  }); 
  // send the new Message everywhere
  // change the Latest Message for every User Chats ...
  return res.status(200).json(new ApiResponse(200, "Message Sent to other Guys successfully"));
}
const fetchMessageForAChat = async (req,res) =>{
  const {chatId} = req.params;
  // we need to check if the user is of the same Group ....
  const messages = await Message.findOne({chatId});

  return res
    .status(200)
    .json(new ApiResponse(200, messages));
}




module.exports = {
  deleteAllMessageInAChat,
  deleteAllMessagesofAUserInAChat,
  sendMessage,
  fetchMessageForAChat,
  sendMessage,
};