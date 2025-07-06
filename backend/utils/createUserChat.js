const  createUserChat = (chat,member=null)=>{
    console.log(chat);
    
    if( chat.chatType == "GroupChat" ){
        return {
            chatId:chat._id,
            chatName : chat.chatName,
            chatType:"group",
            currentMessage:null,
            chatPic : chat.chatProfilePic,
        }
    }
    else if( chat.chatType == "SelfChat" ){
        return {
          chatId: chat._id,
          chatName: chat.members[0].userName,
          chatType: "direct",
          currentMessage: null,
          chatPic: chat.members[0].chatProfilePic,
        };
    }
    // One To One Chat .....
    return {
      chatId: chat._id,
      chatName: member.userName,
      chatType: "direct",
      currentMessage: null,
      chatPic: member.profilePic,
    };
}

module.exports = createUserChat;