
import { TextField } from '@mui/material';
import { useState } from 'react';
// Redux Imports =========
import { useDispatch, useSelector } from "react-redux";
// =======================

// chatId: "6869208a4fdfdff3b94a378a";
// chatName: "No Chat Name default Value from mongoose";
// chatPic: "String";
// chatType: "direct";
// currentMessage: null;
// _id: "6869208a4fdfdff3b94a378d";
const SingleUserChat = ({
  chat,
  isSmall,
  setShowChatsOrChatInfo,
  setSeeChatDetails,
  seeChatDetails,
}) => {
  const dispatch = useDispatch();
  const userName = useSelector((state) => state.user.userName);
  const userId = useSelector((state) => state.user.userId);
  const members = useSelector((state) => state.chat.members);
  const profilePic = useSelector((state) => state.user.profilePic);

  console.log(chat,"  ",seeChatDetails);

  return (
    <div
      className={
        "w-full h-full cursor-pointer p-2 flex gap-x-2 hover:bg-gray-100 rounded-md " +
        `${chat.chatId == seeChatDetails ? "bg-gray-200" : ""}`
      }
      onClick={() => {
        if (isSmall) setShowChatsOrChatInfo(true);

        setSeeChatDetails(chat.chatId);
      }}
    >
      <div className="chatProfilePic w-1/10 h-full">
        <img
          src={(chat.chatName == userName && profilePic) || chat["chatPic"]}
          alt=""
          className="rounded-full"
        />
      </div>
      <div className="chatInfo w-9/10 h-full">
        <h1 className="font-bold">
          {chat.chatName}
          {/* {chat.chatType == "direct" ? chat.chatName } */}
          {/* members.length == 1 ? members[0].userName : members[0]._id == userId ?
          members[1].userName : members[0].userName */}
        </h1>
        <p>{chat.currentMessage}</p>
      </div>
    </div>
  );
};
const AllChats = ({
  setSelectedChat,
  isSmall,
  setShowChatsOrChatInfo,
  setSeeChatDetails,
  seeChatDetails,
}) => {
  const [chatSearchText, setChatSearchText] = useState("");
  const user = useSelector((state) => state.user);
  const chats = useSelector((state) => state.user?.chats);
  console.log(chats);
  console.log(user);

  return (
    <div className="h-full w-full px-2 bg-white rounded-xl shadow-2xl border-1 overflow-y-auto">
      <h1 className="font-bold text-2xl ">Chats</h1>
      {/* Search Bar  */}
      <div className="chatSearchBar w-full mb-1">
        <TextField
          variant="filled"
          className="w-full rounded-md"
          value={chatSearchText}
          onChange={(e) => setChatSearchText(e.target.value)}
        />
      </div>
      {/* Chats of User  */}
      <div className="userChat">
        {chats &&
          chats
            .filter((chat) => {
              if (chatSearchText == "") return true;
              return chat.chatName
                .toLowerCase()
                .includes(chatSearchText.toLowerCase());
            })
            .map((chat) => {
              return (
                <SingleUserChat
                  chat={chat}
                  key={chat._id}
                  isSmall={isSmall}
                  setShowChatsOrChatInfo={setShowChatsOrChatInfo}
                  setSelectedChat={setSelectedChat}
                  setSeeChatDetails={setSeeChatDetails}
                  seeChatDetails={seeChatDetails}
                />
              );
            })}
      </div>
    </div>
  );
};

export default AllChats
