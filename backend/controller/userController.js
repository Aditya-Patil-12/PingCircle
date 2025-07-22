const {User} = require('../models/');
const ApiResponse  = require('../utils/ApiResponse');
// const ApiError = require('../utils')
// because file is getting imported in some other utils file which not defined in index.js with ApiError 
// here the file in utils uses the this file which imports ApiError from index.js which is not exported 
const ApiError = require('../utils/ApiError')
// console.log("Where is this undefined",ApiError);


const {StatusCodes} = require('http-status-codes')

const showUser =  async (req,res) =>{
    const { userId } = req.user;
    const currentUser = await User.findById(userId).select("userName email isEmailVerified profilePic chats");
    res.status(StatusCodes.OK).json(new ApiResponse(200,currentUser,"Welcome"));
}
const searchUsers = async (req,res) =>{
    const { userId }=  req.user;  
    const {search:keyword} = req.query
    console.log(req.params);
    
    if( !keyword && keyword != "" ){
        throw new ApiError(400,"Please Provide Search Parameter");
    }
    console.log("OK over here");
    
    const users = await User.find({
        userName :{"$regex": keyword},
        _id : { $ne : userId },
        isEmailVerified:true,
    }).select('userName profilePic email');
    console.log(users);
    
   res
    .status(StatusCodes.OK)
    .json(new ApiResponse(200, users));
}

const addAChatToUser = async (userId,chat) =>{
    const currentUser = await User.findById(userId);
    let newChats = currentUser.get('chats');

    if( !newChats ) newChats = [chat];
    else newChats = [...newChats,chat];
    currentUser.set('chats',newChats);
    await currentUser.save();
    return ;
}

const deleteAChatOfUser = async (userId,chatId) =>{
    const currentUser = await User.findById(userId);
    console.log(userId," ",chatId," ",currentUser.get('chats'));    
    let newChats = currentUser.get("chats")
    .filter((chat)=>(chatId.toString()) !== ((chat.chatId).toString()));
    console.log(userId," :;: ",newChats," ",chatId);
    currentUser.set("chats", newChats);
    

    return await currentUser.save();
}
const updateAChatOfUser = async (userId,chatId,updatedChat) =>{
    const currentUser = await User.findById(userId);
    const newChats = currentUser.chats.map((chat)=>{
        if( chat.chatId == chatId ){
            return {...chat,...updatedChat};
        }
        return chat;
    }); 
    currentUser.set("chats", newChats);
    await currentUser.save();
    return ;
}

module.exports = {
  searchUsers,
  showUser,
  deleteAChatOfUser,
  addAChatToUser,
  updateAChatOfUser,
};