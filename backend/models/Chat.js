const mongoose = require('mongoose');

const chatModel = new mongoose.Schema({
    chatName: { type: String, trim: true },
    isGroupChat: { type: Boolean, default: false },
    users: [
        {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        },
    ],
    latestMessage: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Message",
    },
    // TODO: use it is as array ....
    groupAdmin: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    }],
},{
    timeStamps:true,
});

const Chat = mongoose.model("Chat", chatModel); 

module.exports = Chat