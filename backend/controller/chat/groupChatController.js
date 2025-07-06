const { GroupChat, Chat } = require("../../models");
const {ObjectId}  = require('mongoose').Types

const {
  ApiError,
  ApiResponse,
  checkForGroupAdmin,
  checkForGroupMember,
  oneOnOneChatName,
} = require("../../utils");

const {updateAChatOfUser,addAChatToUser,deleteAChatOfUser}= require('../userController')
const {deleteAllMessagesofAUserInAChat} = require('../messageController');
const { notifyChatToUser, checkForChatType } = require("../../utils");
// const { loginUser } = require("../authController");
const errorHandlerMiddleware = require('../../middleware/errorHandler');

const createGroupChat = async (req,res) =>{
  // Group Chat ....
  const {userId}= req.user;
  const { chatName, groupType,members } = req.body;
  if (!chatName || !members) {
    throw new ApiError(
      400,
      "Something out of Chat Name or Chat Members is Missing"
    );
  }
  // chatName repeated ..... (no digits allowed)
  const doesChatNameAlreadyExists = await GroupChat.findOne({ chatName }).populate('members');
  
  if (doesChatNameAlreadyExists) {
    await newChat.populate({
      path: "members",
      select: "userName email phoneNo profilePic chats",
    });
        return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                doesChatNameAlreadyExists,
                `${chatName} Created Succesfully`
            )
        );
    }
    if (members.length < 2) {
        throw new ApiError(400, "Chat Should Have Atleast Two Members");
    }
    if (/\d/.test(chatName)) {
        throw new ApiError(400, "Chat Name Should Contain Digits");
    }
    console.log("New Group Chat Created", {
      chatName,
      createdByUser: userId,
      groupType,
      members: [...members, userId],
      groupAdmins: [userId],
    });
    
    const newChat = await GroupChat.create({
        chatName,
        createdByUser: userId,
        groupType,
        members: [...members, userId],
        groupAdmins: [userId],
    });
    
    const chatInfo = {
      chatId: newChat._id,
      chatName: newChat.chatName,
      currentMessage: null,
      chatPic: newChat.chatProfilePic,
    };
    await notifyChatToUser(chatInfo,[...members,userId]);
    await newChat.populate({
        path: "members",
        select: "userName email phoneNo profilePic chats",
    });
    return res
        .status(201)
        .json(new ApiResponse(201, newChat, `${chatName} Created Succesfully`));
}

const updateGroupChat = async (req,res) =>{
  const { chatName, chatProfilePic } = req.body;
  const { chatId } = req.params;
  if (!chatName &&  !chatProfilePic) {
    return res.status(200).json(new ApiResponse(200, {}, "Update Successfull"));
  }
  const existingChat = await GroupChat.findById(chatId);
  if (chatName) {
    existingChat["chatName"] = chatName;
  }
  if (chatProfilePic) {
    existingChat["chatProfilePic"] = chatProfilePic;
  }
  const changed = {
    _id:chatId,
  };
  for (let member of existingChat.members) {
    await updateAChatOfUser(member, chatId, {
      chatName: existingChat.chatName,
      chatPic: existingChat.chatProfilePic,
    });
  }
  await existingChat.save();
  await existingChat.populate({
    path: "members",
    select: "userName email phoneNo profilePic chats",
  });
  return res.status(200).json(new ApiResponse(200, {}, "Update Successfull"));
}

const addGroupAdmins = async (chat, newAdmins) => {
  const checkAdmins = new Set();
  let modifiedAdmins = chat.groupAdmins;
  for (let member of chat.groupAdmins) {
    checkAdmins.add(member.toString());
  }
  //  Add members .....
  // 1) Update Group Members ....
  for (let newAdmin of newAdmins) {
    if (!checkAdmins.has(newAdmin.toString())) {
      modifiedAdmins.push(newAdmin);
      checkAdmins.add(newAdmin.toString());
    }
  }
  
  await chat.set("members", modifiedAdmins);
  await chat.save();
  console.log(chat);
  return;
};

const addGroupMembers = async (chat,newMembers)=>{
  const checkMembers = new Set();
  let modifiedMembers = chat.members;
  let verifiedNewMembers = [];
  for (let member of chat.members) {
    checkMembers.add(member.toString());
  }
  //  Add members .....
  // 1) Update Group Members ....
  for (let newMember of newMembers) {
    if (!checkMembers.has(newMember)) {
      modifiedMembers.push(newMember);
      verifiedNewMembers.push(newMember);
      checkMembers.add(newMember.toString());
    }

  }
  await chat.set("members", modifiedMembers);
  await chat.save();
  // 2) User Update ......
  for(let newMember of verifiedNewMembers ){
    await addAChatToUser(newMember,{
      chatId:chat._id,
      chatName:chat.chatName,
      chatType:"group",
      currentMessage: null,
      chatPic : chat.chatProfilePic,
    });
  }
  return ;
}

const deleteGroupMembers = async(chat,removeMembers) =>{

  const superAdmin = chat.createdByUser.toString();
  const memberToAdmin = new Map();
  let newMembers = [],newAdmins = [],verifiedMembersToBeRemoved=[];

  for (let member of chat.members) {
    memberToAdmin.set(member.toString(), -2);
  }
  for(let adminIndex in chat.groupAdmins){
    memberToAdmin.set(chat.groupAdmins[adminIndex].toString(),adminIndex);
  }
  //  Add members .....
  // 1) Update Group Members ....
  for (let member of removeMembers) {
    // superAdmin Cannot be Deleted .....
    if( member.toString() == superAdmin  ) continue ;
    if (memberToAdmin.has(member.toString())) {
      verifiedMembersToBeRemoved.push(member);
      memberToAdmin.set(member.toString(), -1);
    }
  }
  newMembers = chat.members.filter((member)=>{
    return memberToAdmin.get(member.toString()) != -1;
  })
  newAdmins = chat.groupAdmins.filter((member) => {
    return memberToAdmin.get(member.toString()) != -1;
  });
  console.log(newMembers," ",newAdmins," ",memberToAdmin);
  
  await chat.set("members", newMembers);
  await chat.set("groupAdmins", newAdmins);
  await chat.save();
  console.log("Delete Member Chat\n",await chat);
  
  // 2) User Update ......
  for (let newMember of verifiedMembersToBeRemoved) {
    await deleteAChatOfUser(newMember,chat._id);
  }
  return;
}
const deleteGroupAdmins = async (chat, removeAdmins) =>{
  const superAdmin  = chat.createdByUser.toString();
  const checkAdmins = new Set();
  let newAdmins = [];
  //  Add members .....
  // 1) Update Group Admins ....
  for (let admin of removeAdmins) {
    // superAdmin will always be Admin .....
    if (admin.toString() == superAdmin) continue;
    if (!checkAdmins.has(admin.toString())) {
      checkAdmins.add(admin.toString());
    }
  }
  newAdmins = chat.groupAdmins.filter((admin) => {
    return (!checkAdmins.has(admin.toString()));
  });
  await chat.set("groupAdmins", newAdmins);
  await chat.save();
  return;
};

// chatId : params ....
// modifyAction :"add" or "delete"
const modifyGroupMembers = async (req,res) =>{
  const { userId } = req.user;
  const { chatId } = req.params;
  const {modifyAction,members} = req.body;
  if ( (!chatId) || (!modifyAction)  || (!members) 
    || (members.length === 0) ) {
    throw new ApiError(400, "Something out of chatId modifyAction or Selected Members is missing");
  }
  const chat = await GroupChat.findById(chatId);
  checkForChatType(chat,"GroupChat");

  if( !(checkForGroupAdmin(chat.groupAdmins,userId)) ){
    throw new ApiError(401,"Please Be A Group Admin To Modify Members")
  }
  if( (modifyAction) == ("add") ){
    addGroupMembers(chat,members);
    await chat.populate({
      path: "members",
      select: "userName email phoneNo profilePic chats",
    });
    return res
      .status(200)
      .json(new ApiResponse(200, chat, "Members Modified Successfull"));
  }
  // delete Members ...
  // 1) Cannot Delete SuperAdmin ....
  // 2) Also Update Group Admins Also ...
  // 3) Update removed user Chat ....
  deleteGroupMembers(chat,members);
  await chat.populate({
    path: "members",
    select: "userName email phoneNo profilePic chats",
  });
  console.log(chat);
  return res
    .status(200)
    .json(new ApiResponse(200, chat, "Members Modified Successfull"));
}
const modifyGroupAdmins = async (req,res) =>{
  const { userId } = req.user;
  const { chatId } = req.params;
  const { modifyAction, admins } = req.body;
  if ( (!chatId) || (!modifyAction) || (!admins) || (admins.length === 0) ) {
    throw new ApiError(
      400,
      "Something out of chatId modifyAction or Selected Admins is missing"
    );
  }
  const chat = await GroupChat.findById(chatId);
  checkForChatType(chat, "GroupChat");

  if (!checkForGroupAdmin(chat.groupAdmins, userId)) {
    throw new ApiError(401, "Please Be A Group Admin To Modify Members");
  }
  if (modifyAction == "add") {
    addGroupAdmins(chat, admins);
    await chat.populate({
      path: "members",
      select: "userName email phoneNo profilePic chats",
    });
    return res
      .status(200)
      .json(new ApiResponse(200, chat, "Members Modified Successfull"));
  }
  // delete Members ...
  // 1) Cannot Delete SuperAdmin ....
  // 2) Also Update Group Admins Also ...
  // 3) Update removed user Chat ....
  deleteGroupAdmins(chat, admins);
  await chat.populate({
    path: "members",
    select: "userName email phoneNo profilePic chats",
  });
  return res
    .status(200)
    .json(new ApiResponse(200, chat, "Members Modified Successfull"));
}

const exitSuperAdmin =  async (chat,nextSuperAdmin) =>{
  // next SuperAdmin should be a part of group 
  // the SuperAdmin is the last user then the group the delete it
  if( chat.members.length == 1 ){ 
    return ;
  }


  if (!nextSuperAdmin) {
    throw new ApiError(
      400,
      "Please Provide Other User to Appoint as Group Owner with"
    );
  }
  if( nextSuperAdmin == chat.createdByUser.toString() ){
    throw new ApiError(400,"Next Super Admin is the User Exiting")
  }
  console.log(nextSuperAdmin,"  ",chat.createdByUser.toString());
  
  // appoint a newAdmin 
  chat.createdByUser = nextSuperAdmin;
  const ifAlreadyAdmin = chat.groupAdmins.find((admin)=>{
    return (admin.toString() == nextSuperAdmin.toString());
  })
  console.log(ifAlreadyAdmin,' ',chat.groupAdmins);
  
  if( !ifAlreadyAdmin ){
    chat.set("groupAdmins", [...chat.groupAdmins, new ObjectId(nextSuperAdmin)]);
  }
  return ;
}
const exitGroupChat = async (req,res) =>{
  const { chatId } = req.params;
  const { userId } = req.user;
  // throw new ApiError(400,"Checking")
  let chat = await GroupChat.findById(chatId);
  if( !checkForGroupMember(chat.members,userId) ){
    throw new ApiError(401,"Please Be A Part of Group");
  }
  console.log(chat);
  

  console.log(userId.toString()," ",chat.createdByUser.toString());
  
  if( userId.toString() == chat.createdByUser.toString() ){
    const {nextSuperAdmin} = req.body;
    await exitSuperAdmin(chat,nextSuperAdmin);
    // chat = await GroupChat.findById(chatId);
  }



  // return ;
  // remove User Chats ...
    deleteAChatOfUser(userId,chatId);
  // Remove user messages related to the Chat ...
    deleteAllMessagesofAUserInAChat(chatId,userId);
  // Remove Membership and GroupAdmins ...
  const newMembers = chat.members.filter((member)=>{
    return member.toString() != (userId).toString();
  });
  const newAdmins = chat.groupAdmins.filter((admin)=>{
    return admin.toString() != (userId).toString();
  });
  console.log(newAdmins," ",newMembers," ",userId," ",chat);
  
  await chat.set("members", newMembers);
  await chat.set("groupAdmins", newAdmins);
  await chat.save();
  // if group members = 0 , then delete the group ...
  if( chat.members.length == 0 ){
    // cha=
    await GroupChat.findOneAndDelete({_id:chatId});
    return res
      .status(200)
      .json(new ApiResponse(200, {}, "Exit Group Chat Successfull"));
  }
  await chat.populate({
    path: "members",
    select: "userName email phoneNo profilePic chats",
  });
  return res
    .status(200)
    .json(new ApiResponse(200, chat, "Exit Group Chat Successfull"));
}




module.exports = {
  createGroupChat,
  updateGroupChat,
  modifyGroupMembers,
  modifyGroupAdmins,
  exitGroupChat,
};