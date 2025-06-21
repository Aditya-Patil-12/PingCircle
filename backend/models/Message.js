const mongoose = require("mongoose");

const messageModel = new mongoose.Schema(
    {
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
        content: { type: "String" },
        chat: { type: mongoose.Schema.Types.ObjectId, ref: "Chat" },
    },
    {
        timeStamps: true,
    }
);

const Message = mongoose.model("Message", messsageModel);

module.exports = Message;
