import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createMessageAsync } from "../MessageSlice";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";


const ChatMessageSend = ({ seeChatDetails,socket }) => {
    const dispatch = useDispatch();
    const [messageTyped,setMessageTyped] = useState("");
    const chat = useSelector((state)=>state.chat);
    console.log("Just Check Bro ::::____((()))____:::::",chat," ",socket);
    
    return (
      <div className="h-full flex justify-between">
        <div className="w-95/100 border-1">
          <input
            type="text"
            name=""
            id=""
            className="border-1 w-full h-full px-2"
            value={messageTyped}
            onKeyDown={async (key) => {
              if (key.code == "Enter") {
                if (messageTyped) {
                  console.log("Hey");

                  const resp =  await dispatch(
                    createMessageAsync({
                      id: seeChatDetails,
                      content: messageTyped,
                    })
                  );
                  socket.current.emit("newMessage", {
                    chat: { chatId: chat.chatId, members: chat.members },
                    message: resp.payload,
                  });                  
                  setMessageTyped("");
                }
              }
            }}
            onChange={(e) => setMessageTyped(e.target.value)}
          />
        </div>
        <div className="w-5/100 flex justify-center items-center">
          <button
            type="button"
            className="cursor-pointer bg-green-700 w-full h-full"
            onClick={async () => {
              console.log(messageTyped);

              if (messageTyped) {
                console.log("Hey");

                const resp = await dispatch(
                  createMessageAsync({
                    id: seeChatDetails,
                    content: messageTyped,
                  })
                );
                  socket.current.emit("newMessage", {
                    chat: {chatId:chat.chatId,members: chat.members},
                    message: resp.payload,
                  });
                setMessageTyped("");
              }
            }}
          >
            <ArrowUpwardIcon />
          </button>
        </div>
      </div>
    );
};

export default ChatMessageSend
