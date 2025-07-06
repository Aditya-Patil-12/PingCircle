const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema(
{
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    chatId: { type: mongoose.Schema.Types.ObjectId, ref: "Chat" },
    // TODO :  Content can be a text , file , audio , video
    content: { type: "String" ,default:""},
},
{
    timeStamps: true,
}
);
// return new Document with the given Schema
const Message = mongoose.model("Message", messageSchema);

module.exports = Message;
