const Chat = require("./Chat");
const mongoose = require("mongoose");

const groupChatSchema = new mongoose.Schema(
  {
    chatName: { type: String, trim: true , unique:true, },
    createdByUser: { type: mongoose.Schema.Types.ObjectId,  ref:"User", required:true },
    groupType: {
        type:String,
        enum:["normal","channel"],
        default:"normal",
    },
    chatProfilePic:{
        type:String,
        default:"",
    },
    groupAdmins: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
    ],
  },
//   { discriminatorKey: "chatType", timestamps: true }
);

const GroupChat = Chat.discriminator("GroupChat", groupChatSchema);


module.exports= GroupChat;