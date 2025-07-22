import { useState } from "react";
// Material UI Imports =====
import { Button, TextField } from "@mui/material";
// =====================

// Redux Imports =========
import { useSelector,useDispatch } from "react-redux";
import { exitChatAsync } from "../../../ChatSlice";
import { resetMessage } from "../../../../messsage/MessageSlice";
import { resetChat } from "../../../ChatSlice";
import { deleteAChat } from "../../../../user/UserSlice";
// =======================

import NextSuperAdmin from "./NextSuperAdmin";
const AboutChat = ({ chat, setSeeChatDetails }) => {
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.user.userId);
  const [specialModal, setSpecialModal] = useState(false);
  // console.log(
  //   chat,
  //   " ",
  //   userId,
  //   " ",
  //   chat.chatType == "GroupChat" ,
  //     chat.createdByUser == userId ,
  //     chat.members.length > 1
  // );
  
  return (
    <div
      className={
        !specialModal
          ? "flex flex-col align-center gap-y-2"
          : "relative" + " h-full w-full"
      }
    >
      <div
        className={`${specialModal ? "absolute" : "hidden"}` + " w-full h-full border-1"}
      >
        <NextSuperAdmin
          setSeeChatDetails={setSeeChatDetails}
          chat={chat}
          setSpecialModal={setSpecialModal}
        />
      </div>
      <div className="info h-9/10 flex flex-col gap-y-5">
        {/* Profile Photo */}
        <div className="w-50 h-50 border-1 self-center rounded-full overflow-hidden">
          <img
            src="https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"
            alt=""
            className="w-full h-full cover"
          />
        </div>
        {/* Name  */}
        <div className="border-1 self-center">
          <h1>{chat.chatName}</h1>
        </div>
        {/* Description */}
        <div className="border-1 self-center">
          <h1>{"We need Description tooo"}</h1>
        </div>
        {/* Created BY */}
        <div>
          <h1>{chat?.createdBy}</h1>
        </div>
      </div>
      <div className="exit h-1/10">
        {/* Exit button */}
        {chat.chatType != "SelfChat" && !specialModal && (
          <div className="border-1">
            <Button
              onClick={async () => {
                if (chat.chatType != "SelfChat") {
                  if (
                    chat.chatType == "GroupChat" &&
                    chat.createdByUser == userId
                    && (chat.members.length > 1)
                  ) {
                    // superAdmin
                    setSpecialModal(true);
                  } else {
                    const resp = await dispatch(exitChatAsync());
                    if (resp.payload.success) {
                      setSeeChatDetails("");
                      dispatch(deleteAChat(chat.chatId));
                      dispatch(resetChat());
                      dispatch(resetMessage());
                    }
                  }
                }
              }}
              variant="contained"
              className={" bg-red "+`${(specialModal)?"hidden":""}`}
            >
              Exit
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AboutChat;
