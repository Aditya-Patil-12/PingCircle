import { useState } from "react";
import ChatMedia from "./ChatMedia"
import ChatMembers from "./ChatMembers"
const ChatInfo = ({data,setShowMembersGroupModal}) => {
    const [groupInfoType, setGroupInfoType] = useState("members");
        // console.log(
        //   " @#$%^&*^%$%^&*((*&^%$#@#$%^&*(^%#$%^&\n"
        // );

  return (
    <div className="h-full w-full">
      <div className="text-right h-1/20">
        <button
          type="button"
          className="cursor-pointer"
          onClick={() => setShowMembersGroupModal(false)}
        >
          Close
        </button>
      </div>
      <div className="info flex h-19/20 ">
        <div className="index w-1/10  h-full text-center">
          <button
            className={
              "cursor-pointer w-full " +
              `${
                groupInfoType == "members" ? "border-l-4 border-l-green-500" : ""
              }`
            }
            onClick={() => setGroupInfoType("members")}
          >
            Members
          </button>
          <button
            className={
              "cursor-pointer w-full " +
              `${
                groupInfoType == "members" ? "":"border-l-4 border-l-green-500" 
              }`
            }
            onClick={() => setGroupInfoType("media")}
          >
            Media
          </button>
        </div>
        <div className="component w-9/10 h-full">
          {(groupInfoType == "members") ? (
            <ChatMembers data={data} />
          ) : (
            <ChatMedia />
          )}
        </div>
      </div>
    </div>
  );
}

export default ChatInfo
