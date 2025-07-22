import {io} from 'socket.io-client'
import { useRef,useState,useEffect } from 'react';


// Components ==============
import { Chat,AllChats,ChatNavbar,AddChatModal } from '../features/chat/components'
import AddGroupMembersModal from '../features/chat/components/modalContent/AddGroupMembersModal';
// constants ==================
const SERVER_ENDPOINT = import.meta.env.VITE_SERVER_ENDPOINT;
// redux imports ====================
import { useDispatch, useSelector } from 'react-redux';
import { addMessage } from '../features/messsage/MessageSlice';
//=================================== 


const ChatPage = () => {
  const [seeChatDetails, setSeeChatDetails] = useState("")
  const [showAddChatModal,setShowAddChatModal] = useState(false);
  const [showChatsOrChatInfo, setShowChatsOrChatInfo] = useState(false);
  const [addGroupMembersModal, setAddGroupMembersModal] = useState(false);
  const userId = useSelector ((state)=>state.user.userId);
  const dispatch = useDispatch();
  console.log(showAddChatModal);
  const socket = useRef(null);

  useEffect(()=>{
      socket.current = io(SERVER_ENDPOINT);
      
      socket.current.emit("joinPersonalChat",{_id:userId});
      socket.current.on("connected", () => {
        console.log("Client Side Connection Done");
      });
      return () =>{
        socket.current.disconnect();
      }
  },[userId]);
useEffect(() => {
  const handler = async (data) => {
    await dispatch(addMessage(data.message));
    console.log("Check Message", data);
  };

  socket.current.on("recieveNewMessage", handler);

  // Cleanup function to remove listener
  return () => {
    socket.current.off("recieveNewMessage", handler);
  };
}, [dispatch]);



  return (
    <div className="h-screen overflow-y-auto relative">
      {showAddChatModal ? (
        <AddChatModal
          setShowAddChatModal={setShowAddChatModal}
          seeChatDetails={seeChatDetails}
          setSeeChatDetails={setSeeChatDetails}
        />
      ) : null}
      {addGroupMembersModal ? (
        <AddGroupMembersModal
          seeChatDetails={seeChatDetails}
          setSeeChatDetails={setSeeChatDetails}
          setAddGroupMembersModal={setAddGroupMembersModal}
        />
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
              setSeeChatDetails={setSeeChatDetails}
              seeChatDetails={seeChatDetails}
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
              seeChatDetails={seeChatDetails}
              setSeeChatDetails={setSeeChatDetails}
              addGroupMembersModal={addGroupMembersModal}
              setAddGroupMembersModal={setAddGroupMembersModal}
              socket={socket}
            />
          </div>
        </div>
        <div className="hidden lg:w-1/3 lg:block">
          <AllChats
            isSmall={false}
            setSeeChatDetails={setSeeChatDetails}
            seeChatDetails={seeChatDetails}
          />
        </div>
        <div className="hidden lg:w-2/3 lg:block">
          <Chat
            isSmall={false}
            seeChatDetails={seeChatDetails}
            setSeeChatDetails={setSeeChatDetails}
            addGroupMembersModal={addGroupMembersModal}
            setAddGroupMembersModal={setAddGroupMembersModal}
            socket={socket}
          />
        </div>
      </div>
    </div>
  );
}

export default ChatPage
