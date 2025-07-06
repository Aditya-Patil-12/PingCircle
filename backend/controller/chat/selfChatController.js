const SelfChat = require('../../models/chat/SelfChat');
const {ApiResponse} = require('../../utils');
const {createUserChat}  = require('../../utils');
const { addAChatToUser } = require('../userController');

const createSelfChat = async (req,res)=>{
    const {userId} = req.user;
    const isChatAlreadyExist = await SelfChat.findOne({userId});
    if( isChatAlreadyExist ){
        await isChatAlreadyExist.populate({
            path:"members",
            select: "userName email phoneNo profilePic chats",
        });
        return res.status(200).json(new ApiResponse(200,isChatAlreadyExist,"Chat Already Exists\n"));
    }
    // we need to do add the chat to user after creation
    const newSelfChat = await SelfChat.create({
      userId,
      members: [userId],
    });
    await newSelfChat.populate({
      path: "members",
      select: "userName email phoneNo profilePic",
    });
    const userChatPayload = createUserChat(newSelfChat);
    await addAChatToUser(userId, userChatPayload);
    await newSelfChat.populate({
      path: "members",
      select: "chats",
    });
    return res.status(201).json(new ApiResponse(201,newSelfChat,"Self Chat Created Succesfully"));
};


module.exports = createSelfChat;