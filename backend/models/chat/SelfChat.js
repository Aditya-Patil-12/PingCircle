const Chat = require("./Chat");
const mongoose = require("mongoose");

const selfChatModel = new mongoose.Schema({
    userId :{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
    }
});

const SelfChat = Chat.discriminator("SelfChat", selfChatModel);
module.exports = SelfChat;