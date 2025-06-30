const mongoose = require("mongoose");

const messageModel = new mongoose.Schema(
{
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    chat: { type: mongoose.Schema.Types.ObjectId, ref: "Chat" },
    // TODO :  Content can be a text , file , audio , video
    content: { type: "String" ,default:""},
},
{
    timeStamps: true,
}
);

const Message = mongoose.model("Message", messageModel);

module.exports = Message;
