const Chat =  require('./Chat')
const mongoose = require('mongoose');

const oneToOneChatModel = new mongoose.Schema(
  {

    // user1Id user2Id
    // for creating ........
    // user1Id+" "+user2Id
    // for checking if chat exists .....
    // user1Id+" "+user2Id
    // user2Id+" "+user1Id
    checkId:{
      type:String ,
      required:true,
      unique:true,
    },
    isDeletedByUser1:{
      type:Date,
      default:null,
    },
    isDeletedByUser2:{
      type:Date,
      default:null,
    },
  },
);



const OneToOneChat = Chat.discriminator("OneToOneChat",oneToOneChatModel);
module.exports = OneToOneChat;