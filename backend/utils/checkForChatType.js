const {ApiError} =  require('./ApiError'); 
async function checkForChatType(chat,chatType) {
    if (!chat) {
      throw new ApiError(400, `Chat Does Not Exists`);
    }
    if (chat.chatType != chatType) {
      throw new ApiError(400, "Can't Perform Action As the");
    }
}

module.exports = checkForChatType;