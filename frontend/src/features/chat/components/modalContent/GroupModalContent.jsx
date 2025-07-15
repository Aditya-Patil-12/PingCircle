import { TextField } from "@mui/material";
import { Button } from "@mui/material";
import { useEffect, useState } from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import SingleUser from "./helper/SingleUser";
import CloseIcon from "@mui/icons-material/Close";

const FilteredUsers = ({
  users,
  searchUserName,
  selectedGroupMembers,
  handleGroupChange,
  setSearchUserName,
}) => {
  // console.log(
  //   selectedGroupMembers,
  //   " ",
  //   !searchUserName,
  //   " ::check::::",
  //   users,
  //   users.filter((user) => {
  //     return !selectedGroupMembers.has(
  //       JSON.stringify({
  //         _id: user._id,
  //         userName: user.userName,
  //       })
  //     );
  //   })
  // );

  if (!searchUserName) {
    // console.log("empty");

    return (
      <>
        {users
          .filter((user) => {
            return !selectedGroupMembers.has(
              JSON.stringify({
                _id: user._id,
                userName: user.userName,
              })
            );
          })
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
  }
  return (
    <div className="">
      {users
        .filter(
          (user) =>
            !selectedGroupMembers.has(
              JSON.stringify({
                _id: user._id,
                userName: user.userName,
              })
            ) &&
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
    </div>
  );
};

const GroupModalContent = ({
  setShowAddChatModal,
  options,
  setOptions,
}) => {
  const [groupName, setGroupName] = useState("");
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

  const [selectedGroupMembers, setSelectedGroupMembers] = useState(
    new Set([JSON.stringify({ _id: 0, userName: "Adi" })])
  );

  const handleGroupChange = (info, action) => {
    const data = {_id:info._id,userName:info.userName};
    if (action == "add") {
      if (!selectedGroupMembers.has(JSON.stringify(data))) {
        setSelectedGroupMembers((selectedGroupMembers) => {
          const newSelectedGroupMembers = [
            ...selectedGroupMembers,
            JSON.stringify(data),
          ];
          return new Set(newSelectedGroupMembers);
        });
      }
    } else {
      // delete ....
      if (selectedGroupMembers.has(JSON.stringify(data))) {
        // console.log("Delete :::: ", data);
        setSelectedGroupMembers((selectedGroupMembers) => {
          // console.log("Already::::::::::", selectedGroupMembers);

          const newSelectedGroupMembers = [...selectedGroupMembers].filter(
            (member) => (JSON.parse(member)._id) != (data._id)
          );
          // console.log("New::::::::::", newSelectedGroupMembers);
          return new Set(newSelectedGroupMembers);
        });
      }
    }
    return;
  };

  return (
    <div className="w-full h-full overflow-y-auto px-2 border-8">
      <div className="h-4/10 w-full">
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
        <div className="inputContainer flex flex-row border-1 justify-between">
          <div className="groupName border-2">
            <TextField
              variant="outlined"
              label="Group Name"
              className="w-full"
              value={groupName}
              onChange={(e) => {
                setGroupName(e.target.value);
              }}
            />
          </div>
          <div className="searchUser">
            <TextField
              className="w-full"
              value={searchUserName}
              placeholder="Enter Members User Name"
              onChange={(e) => {
                setSearchUserName(e.target.value);
              }}
            />
          </div>
        </div>
        {/* selected Group Members  ========== */}
        <div className="border-1 grid grid-cols-5">
          <div className="selectedUser col-span-4 flex flex-wrap">
            {[...selectedGroupMembers].map((user) => {
              return (
                <div className="flex gap-x-2 border-1 px-2" key={user._id}>
                  <h1>{JSON.parse(user).userName}</h1>
                  <button
                    className="text-red-500 cursor-pointer"
                    onClick={() =>
                      handleGroupChange(JSON.parse(user), "delete")
                    }
                  >
                    {" "}
                    <CloseIcon />{" "}
                  </button>
                </div>
              );
            })}
          </div>
          <div className="createGroup col-span-1 text-center border-2">
            <Button variant="contained" className="w-full" onClick={()=>{
              // groupName searchUserName selectedGroupMembers
              console.log(groupName," ",searchUserName," ",selectedGroupMembers);
              
              setShowAddChatModal(false);
            }}>
              Create
            </Button>
          </div>
        </div>
      </div>
      {/* User called from API    ========== */}
      <div className="availableUserOptions mt-2  w-full h-6/10">
        <FilteredUsers
          searchUserName={searchUserName}
          setSearchUserName={setSearchUserName}
          selectedGroupMembers={selectedGroupMembers}
          users={matchingUser}
          handleGroupChange={handleGroupChange}
        />
      </div>
    </div>
  );
};

export default GroupModalContent;