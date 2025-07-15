import { TextField } from "@mui/material";
import { Button } from "@mui/material";
import { useEffect, useState } from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import SingleUser from "./helper/SingleUser";
const FilteredUsers = ({
  users,
  searchUserName,
  handleGroupChange,
  setSearchUserName,
}) => {
  if (!searchUserName) {
    return (
      <>
        {users.map((user) => {
          return (
            <SingleUser
              user={user}
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
      {users
        .filter((user) =>
          user.userName.toLowerCase().includes(searchUserName.toLowerCase())
        )
        .map((user) => {
          return (
            <SingleUser
              user={user}
              handleMembersChange={handleGroupChange}
              setSearchUserName={setSearchUserName}
            />
          );
        })}
    </>
  );
};
const OneToOneModalContent = ({ setShowAddChatModal, options, setOptions }) => {
  const [searchUserName, setSearchUserName] = useState("");
  const [matchingUser, setMatchingUser] = useState([
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
    },
  ]);
  console.log(matchingUser);
  const handleGroupChange = (user,_) => {
    console.log(user);
    setShowAddChatModal(false);
  };
  return (
    <div className="w-full h-full overflow-y-auto px-2">
      <div className="closeIcon flex justify-between">
        <button
          className="cursor-pointer"
          onClick={() => {
            setOptions(0);
          }}
        >
          <ArrowBackIcon />
        </button>
        <button
          className="cursor-pointer"
          onClick={() => {
            setShowAddChatModal(false);
          }}
        >
          Close
        </button>
      </div>
      <div className="searchUser ">
        <TextField
          className="w-full"
          value={searchUserName}
          placeholder="Enter User Name to Ping"
          onChange={(e) => {
            setSearchUserName(e.target.value);
          }}
        />
      </div>
      <div className="availableUserOptions mt-2">
        <FilteredUsers
          users={matchingUser}
          searchUserName={searchUserName}
          handleGroupChange={handleGroupChange}
          setSearchUserName={setSearchUserName}
        />
      </div>
    </div>
  );
};
export default OneToOneModalContent;
