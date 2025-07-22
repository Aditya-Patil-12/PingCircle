import { useEffect, useState } from "react";
import SingleUser from "./helper/SingleUser";

// Material UI
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { TextField, Button } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";


// redux & Slices  imports ===================
import { useSelector,useDispatch } from "react-redux";
import { searchUserAsync } from "../../../user/UserSlice";
import { modifyMembersAsync } from "../../ChatSlice";
// ===========================================


const FilteredUsers = ({
  users,
  searchUserName,
  newGroupMembers,
  handleGroupChange,
  setSearchUserName,
}) => {
  console.log(users);
  
  if (!searchUserName) {
    return (
      <>
        {users
          .filter((user) => {
            return !newGroupMembers.has(
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
    <div className="">
      {users
        .filter(
          (user) =>
            !newGroupMembers.has(
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
              key={user._id}
              handleMembersChange={handleGroupChange}
              setSearchUserName={setSearchUserName}
            />
          );
        })}
    </div>
  );
};

const AddGroupMembersModal = ({ setAddGroupMembersModal }) => {
  const dispatch = useDispatch();
  const status = useSelector((state) => state.user.status);
  const members = useSelector((state)=>state.chat.members);
  const [searchUserName, setSearchUserName] = useState("");

  const [matchingUser, setMatchingUser] = useState([]);

  const [newGroupMembers, setNewGroupMembers] = useState(
    new Set([JSON.stringify({ _id: 0, userName: "Adi" })])
  );

  const handleGroupChange = (info, action) => {
    const data = { _id: info._id, userName: info.userName };
    if (action == "add") {
      if (!newGroupMembers.has(JSON.stringify(data))) {
        setNewGroupMembers((selectedGroupMembers) => {
          const newSelectedGroupMembers = [
            ...selectedGroupMembers,
            JSON.stringify(data),
          ];
          return new Set(newSelectedGroupMembers);
        });
      }
    } else {
      // delete ....
      if (newGroupMembers.has(JSON.stringify(data))) {
        setNewGroupMembers((selectedGroupMembers) => {
          const newSelectedGroupMembers = [...selectedGroupMembers].filter(
            (member) => JSON.parse(member)._id != data._id
          );
          return new Set(newSelectedGroupMembers);
        });
      }
    }
    return;
  };

  useEffect(() => {
    const timeOutId = setTimeout(async () => {
      const data = await dispatch(searchUserAsync(searchUserName));
      console.log("Result ::::::------:::::::", await data);
      const alreadyExistingMembers = new Set();
      if( members ){
        for (let member of members) {
        alreadyExistingMembers.add(member._id);
        }
      }
      setMatchingUser(data.payload.users.filter((user)=> !alreadyExistingMembers.has(user._id)));
    }, 2000);
    return () => {
      clearTimeout(timeOutId);
    };
  }, [searchUserName]);
  console.log(newGroupMembers);
  
  return (
    <div className="absolute z-30 w-full h-full overflow-y-auto border-8 " onClick={()=>{
        setAddGroupMembersModal(false)
    }}>
      <div
        className="w-[70%] h-[80%] relative bg-white rounded-xl shadow-2xl  top-[10%] left-[15%]"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <div className="inputContainer flex flex-row border-5 justify-center">
          <div className="searchUser">
            <TextField
              className="w-full"
              value={searchUserName}
              placeholder="Enter User Name"
              onChange={(e) => {
                setSearchUserName(e.target.value);
              }}
            />
          </div>
        </div>
        {/* selected Group Members  ========== */}
        <div className="border-1 grid grid-cols-5">
          <div className="selectedUser col-span-4 flex flex-wrap">
            {[...newGroupMembers].map((user) => {
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
            <Button
              variant="contained"
              className="w-full"
              onClick={async () => {
                // groupName searchUserName selectedGroupMembers
                console.log(
                  " ",
                  searchUserName,
                  " "
                  //   selectedGroupMembers
                );
                await dispatch(modifyMembersAsync({
                    modifyAction:"add",
                    members:[...newGroupMembers].map((member)=>JSON.parse(member)._id),
                }));
                setAddGroupMembersModal(false);
              }}
            >
              Add
            </Button>
          </div>
        </div>
            {/* User called from API    ========== */}
            <div className="availableUserOptions mt-2  w-full h-6/10">
                {status == "loading" && <h1>Loading .....</h1>}
                {searchUserName.trim() != "" && matchingUser.length == 0 && (
                    <h1>No User with give userName Found .....</h1>
                )}
                <FilteredUsers
                    searchUserName={searchUserName}
                    setSearchUserName={setSearchUserName}
                    newGroupMembers={newGroupMembers}
                    users={matchingUser}
                    handleGroupChange={handleGroupChange}
                />
            </div>
        </div>
    </div>
  );
};

export default AddGroupMembersModal;