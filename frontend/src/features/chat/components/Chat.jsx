import { useEffect,useRef,useState } from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ChatInfo from "./chatInfo/ChatInfo";

// Redux Imports ======================================
import { useSelector,useDispatch } from "react-redux";
import { getChatAsync } from "../ChatSlice";
import { fetchChatMessageAsync } from "../../messsage/MessageSlice";
// ====================================================


// JSX imports ===================================================
import ChatMessageSend from "../../messsage/components/ChatMessageSend";
import ChatMessages from "../../messsage/components/ChatMessages";
// ===============================================================

const Chat = ({
  isSmall,
  setShowChatsOrChatInfo,
  seeChatDetails,
  setAddGroupMembersModal,
  socket,
  setSeeChatDetails,
}) => {
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.auth.userId);
  const [showGroupMembersModal, setShowMembersGroupModal] = useState(false);
  const [chatInfo, setChatInfo] = useState();
  const chat = useSelector((state) => state.chat);

  console.log(
    showGroupMembersModal,
    " ",
    "@#$%^&*^%$%^&*((*&^%$#@#$%^&*(^%#$%^&\n"
  );

  useEffect(() => {
    //  load the chat information of the selected Chat is this
    if (seeChatDetails) {
      console.log("SeeChatDetails ", seeChatDetails);
      const help = async () => {
        await dispatch(getChatAsync(seeChatDetails));
        await dispatch(fetchChatMessageAsync(seeChatDetails));
      };
      help();
    }
  }, [seeChatDetails]);
  useEffect(() => {
    setChatInfo(chat);
  }, [chat]);
  useEffect(() => {
    setShowMembersGroupModal(false);
  }, [seeChatDetails]);
  if (!seeChatDetails) return <div></div>;
  // if (chat.status == "loading" ) {
  //   return <h1>Loading ...</h1>;
  // }
  console.log(chat, " ", userId);
  if( !chat ) return <div></div>
  return (
    <div className="w-full h-full rounded-xl shadow-2xl  bg-white relative border-1">
      <div
        className={`${
          showGroupMembersModal ? "absolute" : "hidden"
        }  bg-white w-full h-full p-2 z-5 rounded-xl shadow-2xl `}
      >
        <ChatInfo
          chat={chat}
          setShowMembersGroupModal={setShowMembersGroupModal}
          setAddGroupMembersModal={setAddGroupMembersModal}
          setSeeChatDetails={setSeeChatDetails}
        />
      </div>
      <div className="w-full h-full p-2">
        <div
          className="header w-full h-1/12 cursor-pointer flex "
          onClick={() => {
            setShowMembersGroupModal(true);
          }}
        >
          {isSmall ? (
            <div className="w-1/25">
              {isSmall && (
                <button
                  type="button"
                  className="cursor-pointer"
                  onClick={(e) => {
                    console.log("Hey");
                    setShowMembersGroupModal(false);
                    setShowChatsOrChatInfo(false);
                    e.stopPropagation();
                  }}
                >
                  <ArrowBackIcon />
                </button>
              )}
            </div>
          ) : null}
          <div
            className={`${
              isSmall ? "w-24/25" : "w-full"
            } bg-red-500 h-full flex `}
          >
            <div className="profilePic w-1/15 lg:w-1/20 h-full p-1">
              <img
                src={
                  "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"
                }
                alt=""
                className="contain w-full h-full rounded-full"
              />
            </div>
            <div className="w-14/15 lg:w-19/20 flex justify-between items-center">
              <h1 className="">
                {chat.chatName ||
                  (chat?.members
                    ? chat?.members[0]?._id == userId
                      ? chat?.members[Math.min(chat.members.length - 1, 1)]
                          ?.userName
                      : chat?.members[0]?.userName
                    : "")}
                {chat.chatType == "SelfChat" ? " (You)" : ""}
              </h1>
              {/* <button
                type="button"
                className="cursor-pointer"
                onClick={() => {}}
              >
                <MoreVertIcon />
              </button> */}
            </div>
          </div>
        </div>
        <div className="chatMessages w-full h-5/6 bg-indigo-600">
          <ChatMessages seeChatDetails={seeChatDetails} />
        </div>
        <div className="chatInput h-1/12 w-full bg-amber-100">
          <ChatMessageSend seeChatDetails={seeChatDetails} socket={socket} />
        </div>
      </div>
    </div>
  );
};

export default Chat
