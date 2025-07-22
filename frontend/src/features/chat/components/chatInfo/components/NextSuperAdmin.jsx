import { TextField } from "@mui/material";
import { useEffect, useState } from "react";

import SingleUser from "../../modalContent/helper/SingleUser";
// redux & Slices  imports ===================
import { useSelector,useDispatch } from "react-redux";
import { exitChatAsync } from "../../../ChatSlice";
import { resetMessage } from "../../../../messsage/MessageSlice";
import { resetChat } from "../../../ChatSlice";
import { deleteAChat } from "../../../../user/UserSlice";
// ===========================================
const FilteredUsers = ({
  users,
  searchUserName,
  handleGroupChange,
  setSearchUserName,
  userId,
}) => {
  console.log(users," ",searchUserName);
  if (!searchUserName) {
    return (
      <>
        {users.filter((user)=> (user._id != userId)).map((user) => {
          return (
            <SingleUser
            user={user}
            key={user._id}
            handleMembersChange={handleGroupChange}
            setSearchUserName={setSearchUserName}
            />
          );
        })}
      </>
    );
  }
  return (
    <>
      {users.length > 0 &&
        users
          .filter(
            (user) =>
              user.userName
                .toLowerCase()
                .includes(searchUserName.toLowerCase()) && user._id != userId
          )
          .map((user) => {
            return (
              <SingleUser
                user={user}
                key={user._id}
                handleMembersChange={handleGroupChange}
                setSearchUserName={setSearchUserName}
              />
            );
          })}
    </>
  );
};
const NextSuperAdmin = ({ setSpecialModal, chat, setSeeChatDetails }) => {
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.user.userId);
  const [searchUserName, setSearchUserName] = useState("");
  const saveChatId = useSelector((state)=>state.chat.chatId);
  const handleGroupChange = async (user) => {
    console.log("Check the user :::",user);
    // do not clear the cart Slice checking .....
    const resp = await dispatch(exitChatAsync({ nextSuperAdmin: user._id }));
    console.log("response recieved", resp);

    if (resp.payload.success) {
      // chat & message + user clear  .....
      dispatch(deleteAChat(saveChatId));
      dispatch(resetChat());
      dispatch(resetMessage());
      setSeeChatDetails("");
      setSpecialModal(false);
    }
    // setShowAddChatModal(false);
  };

  return (
    <div className="w-full h-full overflow-y-auto px-2 bg-white">
      <div className="closeIcon flex justify-end">
        <button
          className="cursor-pointer"
          onClick={() => {
            setSpecialModal(false);
          }}
        >
          Close
        </button>
      </div>
      <div className="searchUser">
        <TextField
          className="w-full"
          value={searchUserName}
          placeholder="Please Enter the UserName of the Next Super Admin"
          onChange={(e) => {
            setSearchUserName(e.target.value);
          }}
        />
      </div>
      <div className="availableUserOptions mt-2">
        {/* {searchUserName.trim() != "" && matchingUser.length == 0 && (
          <h1>No User with give userName Found .....</h1>
        )} */}

        <FilteredUsers
          users={chat.members}
          userId={userId}
          searchUserName={searchUserName}
          handleGroupChange={handleGroupChange}
          setSearchUserName={setSearchUserName}
        />
      </div>
    </div>
  );
};
export default NextSuperAdmin;
