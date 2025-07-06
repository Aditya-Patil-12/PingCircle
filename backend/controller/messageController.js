const {Message} = require('../models')
const {ApiError} = require('../utils');
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

// const updateMesssages = async (chatId) => {
//     const messages = await Message.find({chatId});

//     for()
//   return;
// }; 


module.exports = {
  deleteAllMessageInAChat,
  deleteAllMessagesofAUserInAChat,
};