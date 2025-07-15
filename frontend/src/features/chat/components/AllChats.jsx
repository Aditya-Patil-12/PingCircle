
import { TextField } from '@mui/material';
import { useState } from 'react';
import { setSelectedChatId } from "../../chat/ChatSlice";
import { useDispatch } from "react-redux";
const data = [
  { 
    id:1,
    name: "Aditya",
    latestMessagg: "How Are You",
    chatProfilePic:
      "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
  },
  { 
    id:2,
    name: "Navin",
    latestMessagg: "How Are You ?",
    chatProfilePic:
      "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
  },
  { 
    id:3,
    name: "Shakers",
    latestMessagg: "What' going bro",
    chatProfilePic:
      "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
  },
  { 
    id:4,
    name: "Coding & Concept",
    latestMessagg: "Todays' Lecture on React",
    chatProfilePic:
      "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
  },
  { 
    id:5,
    name: "IIIT Pune Offial Info",
    latestMessagg: "No class of Mahendra",
    chatProfilePic:
      "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
  },
];

const SingleUserChat = ({ chat, isSmall, setShowChatsOrChatInfo }) => {
  const dispatch = useDispatch();
  return (
    <div
      className="w-full h-full cursor-pointer p-2 flex gap-x-2 hover:bg-gray-100"
      onClick={() => {
        dispatch(setSelectedChatId(chat._id));
         setShowChatsOrChatInfo(true);
        }} 
    >
      <div className="chatProfilePic w-1/10 h-full">
        <img src={chat["chatProfilePic"]} alt="" className="rounded-full" />
      </div>
      <div className="chatInfo w-9/10 h-full">
        <h1 className="font-bold">{chat.name}</h1>
        <p>{chat.latestMessagg}</p>
      </div>
    </div>
  );
};
const AllChats = ({ setSelectedChat, isSmall, setShowChatsOrChatInfo }) => {
  const [chatSearchText, setChatSearchText] = useState("");

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
        {data
          .filter((chat) => {
            if (chatSearchText == "") return true;
            return chat.name
              .toLowerCase()
              .includes(chatSearchText.toLowerCase());
          })
          .map((chat, index) => {
            return (
              <SingleUserChat
                chat={chat}
                key={index}
                isSmall={isSmall}
                setShowChatsOrChatInfo={setShowChatsOrChatInfo}
                setSelectedChat={setSelectedChat}
              />
            );
          })}
      </div>
    </div>
  );
};

export default AllChats
