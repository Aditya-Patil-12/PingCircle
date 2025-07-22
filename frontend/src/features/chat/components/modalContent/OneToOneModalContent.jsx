import { TextField } from "@mui/material";
import { Button } from "@mui/material";
import { useEffect, useState } from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import SingleUser from "./helper/SingleUser";

// redux & Slices  imports ===================
import { useSelector,useDispatch } from "react-redux";
import { searchUserAsync,addChatsToUser } from "../../../user/UserSlice";
import { createChatAsync } from "../../ChatSlice";
// =================================
const FilteredUsers = ({
  users,
  searchUserName,
  handleGroupChange,
  setSearchUserName,
}) => {
  console.log(users," ",searchUserName);
  if (!searchUserName) {
    return (
      <>
        {users.map((user) => {
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
      {users.length > 0 && users
        .filter((user) =>
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
    </>
  );
};
const OneToOneModalContent = ({ setShowAddChatModal, options, setOptions,setSeeChatDetails }) => {
  const dispatch = useDispatch();
  const status = useSelector((state)=> state.user.status )
  const [searchUserName, setSearchUserName] = useState("");
  const [matchingUser, setMatchingUser] = useState([]);
  console.log(matchingUser," ",status);
  const handleGroupChange = async (user,_) => {
    console.log(user);
    const resp  = await dispatch(createChatAsync({
      isGroupChat:false,
      member:user._id,
    }));
    console.log("response recieved",resp);
    
    if( resp.payload.success ){
        setSeeChatDetails(resp.payload._id);
        dispatch(addChatsToUser(resp.payload.userChat));
      }
      setShowAddChatModal(false);
  };
  

  useEffect(()=>{
    const timeOutId = setTimeout(async ()=>{
      const data = await dispatch(searchUserAsync(searchUserName));
      console.log("Result ::::::------:::::::",await data);
      setMatchingUser(data.payload.users);
    },2000);
    return () =>{
      clearTimeout(timeOutId);
    }
  },[searchUserName]);
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
        {status == "loading" && <h1>Loading .....</h1>}
        {searchUserName.trim() != "" && matchingUser.length == 0 && (
          <h1>No User with give userName Found .....</h1>
        )}

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
