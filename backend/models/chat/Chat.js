const mongoose = require('mongoose');

const chatModel = new mongoose.Schema(
  {
    members: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  {
    // options section ...
    timeStamps: true,
    discriminatorKey:"chatType",
  }
);

const Chat = mongoose.model("Chat", chatModel); 

module.exports = Chat;