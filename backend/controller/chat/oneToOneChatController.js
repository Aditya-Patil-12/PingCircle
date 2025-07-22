const { OneToOneChat, User } = require("../../models");
const {
  ApiResponse,
  checkForGroupAdmin,
  oneOnOneChatName,
  createUserChat
} = require("../../utils");

const ApiError = require('../../utils/ApiError')
const { notifyChatToUser } = require("../../utils");

const {addAChatToUser,deleteAChatOfUser} = require('../userController');

const { deleteAllMessageInAChat } = require('../messageController');

const createOneToOneChat = async (req, res) => {
  // Group Chat ....
  const { member } = req.body;
  const {userId} =  req.user;
  console.log(member," ",userId);
  
  if (!member ) {
    throw new ApiError(
      400,
      "Please select Two Valid Members"
    );
  }
  const otherUser = await User.findById(member);
  const loggedUser = await User.findById(userId);
  if( !otherUser ){
    return ApiError(400,"Please Select Valid User");
  }
  const id1 = oneOnOneChatName(userId,otherUser._id);
  const id2 = oneOnOneChatName(otherUser._id,userId);
  // chatName repeated ..... (no digits allowed)
  let doesChatAlreadyExists = await OneToOneChat.exists({
    $or: [{ checkId: id1 }, { checkId: id2 }],
  })
    // [] -> not falsy
  if ( doesChatAlreadyExists ) {
    const existingChat = await OneToOneChat.findOne({
      $or: [{ checkId: id1 }, { checkId: id2 }],
    });
    const storedCheckId = existingChat.checkId.split(" ");
    let newMembers = [...existingChat.members,userId];
    if( storedCheckId[0] == userId.toString() ){
      if( !existingChat.isDeletedByUser1 ){
        throw new ApiError(400,"Chat Already Exists");
      }
      existingChat.isDeletedByUser1 = null;
      newMembers.reverse();
      // User chats should be activated ....
    }
    else{
      if (!existingChat.isDeletedByUser2) {
        throw new ApiError(400,"Chat Already Exists");        
      }
      existingChat.isDeletedByUser2 = null;
    }
    await existingChat.set("members",newMembers);
    await existingChat.save();
    await addAChatToUser(userId, createUserChat(existingChat, otherUser));
    const newlyModifiedUser = await User.findById(userId);
    await existingChat
      .populate({
        path: "members",
        select: "userName email phoneNo profilePic chats",
      });
    return res.status(200).json(
      new ApiResponse(
        200,
        {
          members: existingChat.members,
          checkId: existingChat.checkId,
          isDeletedByUser1:existingChat.isDeletedByUser1,
          isDeletedByUser2: existingChat.isDeletedByUser2,
          userChat : newlyModifiedUser.chats.at(-1),
        },
        `Chat Already Exists`
      )
    );
  }

  const newChat = await OneToOneChat.create({
    members: [member, userId],
    checkId:id1
  });
  
  const chatInfo = {
    chatId: newChat._id,
    chatName: member.userName,
    chatType:"direct",
    currentMessage: null,
    chatPic: member.profilePic,
  };
  await notifyChatToUser(createUserChat(newChat,otherUser),[userId]);
  await notifyChatToUser(
    createUserChat(
      newChat,
      loggedUser
    ),
    [member]
  );
  await newChat.populate({ path: "members", select: "userName email phoneNo profilePic chats" });
  const newlyModifiedUser = await User.findById(userId);
    return res
    .status(201)
    .json(new ApiResponse(201, {...(newChat._doc),userChat: newlyModifiedUser.chats.at(-1)}, `Chat Created Succesfully`));
};

const exitOneToOneChat = async (req,res) =>{
  const {userId} = req.user;
  const {chatId} = req.params;
  console.log("The User Id ",userId);
  const chat = await OneToOneChat.findById(chatId);
  const checkId = chat.checkId.split(" ");
  // Messages will be stored ....
  // User chats should be updated ...
  // 1) set isDeletedFlag : true  ....
  console.log(checkId," Array is here");
  if( checkId[0] == userId.toString() ){
    chat.isDeletedByUser1 =  Date.now();
    // we will update user Chat .....
  }
  else{
    chat.isDeletedByUser2 = Date.now();
    // we will update user Chat .....
  }
  const newMembers = await chat.members.filter
  ((member) => ( (member.toString()) != (userId.toString())));
  await chat.set("members",newMembers);
  await chat.save();
  console.log(chat,"After saving ");
  // User Chats should be cleared ....
  await deleteAChatOfUser(userId,chatId);
  console.log(chat,"Came After Deleting User");
  // if Both User have exited we will clear all the chat .....
  if( !((!(chat.isDeletedByUser1)) || (!(chat.isDeletedByUser2))) ){
    console.log("here just deleting ", chatId);
    
    // clear the chat and messages ...
    await OneToOneChat.findOneAndDelete({_id:chatId});
    // delete User Message ....
    await deleteAllMessageInAChat(chatId);
    // return 
  }
  console.log(chat, "Checking for final time ");
  return res.status(200).json(new ApiResponse(200,{},"Chat Exited Succesfully"));
}
module.exports = {
  createOneToOneChat,
  exitOneToOneChat,
};
