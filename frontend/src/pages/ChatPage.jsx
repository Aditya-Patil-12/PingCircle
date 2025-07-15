import {io} from 'socket.io-client'
import { useRef,useState,useEffect } from 'react';


// Components ==============
import { Chat,AllChats,ChatNavbar,AddChatModal } from '../features/chat/components'
// =========================


// constants ==================
const SERVER_ENDPOINT = import.meta.env.VITE_SERVER_ENDPOINT;




const ChatPage = () => { 
  const [click, setClick] = useState(0)
  const socket = useRef(null);
  const [showAddChatModal,setShowAddChatModal] = useState(false);
  const [showChatsOrChatInfo, setShowChatsOrChatInfo] = useState(false);
  console.log(showAddChatModal);

  // useEffect(()=>{
  //     socket.current = io(SERVER_ENDPOINT);
      
  //     socket.current.emit("joinChat", { _id: "1234" });
  //     socket.current.on("connected", () => {
  //       console.log("Client Side Connection Done");
  //     });

  //     return () =>{
  //       socket.current.disconnect();
  //     }
  // },[]);
  // useEffect(()=>{

  // })

  // useEffect(()=>{
  //   // For every Render .....
  //   socket.emit("newMessage",{data:12345});
  // })
  return (
    <div className="h-screen overflow-y-auto relative">
      {showAddChatModal ? (
        <AddChatModal setShowAddChatModal={setShowAddChatModal} />
      ) : null}
      <nav className="ChatNavbar w-full h-1/15 ">
        <ChatNavbar
          showAddChatModal={showAddChatModal}
          setShowAddChatModal={setShowAddChatModal}
        />
      </nav>
      <div className="mainChatContainer overflow-y-auto h-14/15  lg:flex lg:gap-x-2 p-2">
        <div className="responsive h-full w-full lg:hidden ">
          <div
            className={
              "w-full h-full " + `${showChatsOrChatInfo ? "hidden" : ""}`
            }
          >
            <AllChats
              isSmall={true}
              setShowChatsOrChatInfo={setShowChatsOrChatInfo}
            />
          </div>
          <div
            className={
              "w-full h-full " + `${showChatsOrChatInfo ? "" : "hidden"}`
            }
          >
            <Chat
              isSmall={true}
              setShowChatsOrChatInfo={setShowChatsOrChatInfo}
            />
          </div>
        </div>
        <div className="hidden lg:w-1/3 lg:block">
          <AllChats isSmall={false} />
        </div>
        <div className="hidden lg:w-2/3 lg:block">
          <Chat isSmall={false} />
        </div>
      </div>
    </div>
  );
}

export default ChatPage
