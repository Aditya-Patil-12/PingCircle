import { useEffect,useState } from "react";
import { useSelector } from "react-redux";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ChatInfo from "./chatInfo/ChatInfo";
const data = {
  _id:12,
  chatName:"Rockers",
  chatProfilePic:"https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
  members:[
  {
    _id: 1,
    userName: "Aditya",
    chatProfilePic:
      "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
  },
  {
    _id: 2,
    userName: "Suraj",
    chatProfilePic:
      "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
  },
  {
    _id: 3,
    userName: "Roshani",
    chatProfilePic:
      "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
  },
  {
    _id: 4,
    userName: "Chandani",
    chatProfilePic:
      "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
  },
  {
    _id: 5,
    userName: "Phulchand",
    chatProfilePic:
      "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
  },]
};
const Chat = ({ isSmall, setShowChatsOrChatInfo }) => {
  const [showGroupMembersModal,setShowMembersGroupModal] = useState(false);
  const selectedChatId = useSelector((state) => state.chat.selectedChatId);
  const chatStatus = useSelector((state) => state.chat.status);

  console.log(showGroupMembersModal," ","@#$%^&*^%$%^&*((*&^%$#@#$%^&*(^%#$%^&\n");
  
  useEffect(() => {
    //  load the chat information of the selected Chat is this
    if (selectedChatId) {
    }
  }, [selectedChatId]);

  // if (!selectedChatId ) return <div></div>;
  // if( chatStatus == "loading" ){
  //   // return Loading;
  //   return (Loading);
  // }
  return (
    <div className="w-full h-full rounded-xl shadow-2xl  bg-white relative border-1">
      <div
        className={`${
          showGroupMembersModal ? "absolute" : "hidden"
        }  bg-white w-full h-full p-2 z-5 rounded-xl shadow-2xl `}
      >
        <ChatInfo
          data={data}
          setShowMembersGroupModal={setShowMembersGroupModal}
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
                src={data.chatProfilePic}
                alt=""
                className="contain w-full h-full rounded-full"
              />
            </div>
            <div className="w-14/15 lg:w-19/20 flex justify-between items-center">
              <h1 className="">{data.chatName}</h1>
              <button
                type="button"
                className="cursor-pointer"
                onClick={() => {}}
              >
                <MoreVertIcon />
              </button>
            </div>
          </div>
        </div>
        <div className="chatMessages w-full h-5/6 bg-indigo-600"></div>
        <div className="chatInput h-1/12 w-full bg-amber-100"></div>
      </div>
    </div>
  );
};

export default Chat
