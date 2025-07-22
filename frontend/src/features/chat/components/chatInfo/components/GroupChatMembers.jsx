import Owner from "./icons/Owner";
import Admin from "./icons/Admin";
import modifyChatMembers from '../../../../../utils/modifyChatMembers';
import { useEffect,useState } from "react";

// material UI Icons ======================
import { TextField,Button } from "@mui/material";
import AddIcon from '@mui/icons-material/Add'
// =================================
// redux imports ===============
import { useSelector, useDispatch } from "react-redux";
import { modifyAdminsAsync, modifyMembersAsync } from "../../../ChatSlice";
// =============================
const GroupChatMembers = ({ setAddGroupMembersModal }) => {
  const dispatch = useDispatch();
  const chat = useSelector((state) => state.chat);
  const userId = useSelector((state) => state.auth.userId);
  const [actualMemberInfo, setActualMemberInfo] = useState([]);
  const [isCurrentUserAdmin, setIsCurrentUserAdmin] = useState(false);
  const [searchMembers, setSearchMembers] = useState("");
  useEffect(() => {
    setActualMemberInfo(() => {
      const newMembers = modifyChatMembers({
        members: chat.members,
        admins: chat.admins,
      });
      newMembers.sort((a, b) => {
        if (a.isAdmin && b.isAdmin) {
          // superAdmin
          if (b._id == chat.createdByUser) return 1;
          if (a._id == chat.createdByUser) return -1;
          return 0;
        }
        if (a.isAdmin) return -1;
        else if (b.isAdmin) return 1;
        return 0;
      });
      return newMembers;
    });
    setActualMemberInfo((m) => {
      console.log("this should run");
      return m;
    });
    // console.log("now ");
    // setActualMemberInfo((members) =>{

    //   const newMembers = members.sort((a,b)=>{
    //     if( a.isAdmin && b.isAdmin ) {
    //       // superAdmin
    //       if( b._id == chat.createdByUser ) return 1;
    //       if( a._id == chat.createdByUser ) return -1;
    //       return 0;
    //     }
    //       if( a.isAdmin ) return -1;
    //       else if( b.isAdmin ) return 1;
    //       return 0;
    //   });
    //   console.log(newMembers," :::::Check this");

    //   return newMembers;
    // });
  }, [chat.members,chat.admins]);

  useEffect(() => {
    let check = false;
    console.log("sseee here",check," ",actualMemberInfo," ",userId);
    for (let member of actualMemberInfo) {
      if (member.isAdmin && (member._id == userId)) check = true;
    }
    console.log("sseee here",check," ",actualMemberInfo," ",userId);
    
    setIsCurrentUserAdmin(check);
  }, [chat.members,chat.admins,actualMemberInfo]);

  console.log(chat," @#$%^&*&^%$ ",actualMemberInfo," ",isCurrentUserAdmin," ",chat.admins);
  // console.log(chat," @#$%^&*&^%$ ",searchMembers);

  return (
    <div className="border-1 h-full w-full overflow-y-auto">
      <div className="border-2 flex justify-between items-center">
        <TextField
          value={searchMembers}
          onChange={(e) => setSearchMembers(e.target.value)}
          placeholder="Search Members with UserName"
          className="h-full w-6/10"
        />
        <Button
          onClick={() => {
            console.log("Hello");
            // if (isCurrentUserAdmin) 
              setAddGroupMembersModal(true);
          }}
          variant="contained"
          className="h-[40px]"
        >
          <AddIcon />
          Add More Members
        </Button>
      </div>
      {actualMemberInfo
        .filter((member) => {
          if (searchMembers.trim() == "") {
            return true;
          }
          return member.userName
            .toLowerCase()
            .includes(searchMembers.trim().toLowerCase());
        })
        .map((user) => {
          // console.log(user);
          return (
            <div
              className="w-full h-[75px] cursor-pointer p-2 flex gap-x-2 hover:bg-gray-100 overflow-y-auto"
              onClick={() => {}}
            >
              <div className="chatProfilePic w-1/10 h-full">
                <img
                  src={user["profilePic"]}
                  alt=""
                  className="rounded-full w-full h-full contain"
                />
              </div>
              <div className="chatInfo w-9/10 flex flex-col border-1">
                <div className="chatInfo w-full h-1/2 flex justify-between">
                  <h1 className="font-bold">{user.userName}</h1>
                  {user.isAdmin ? (
                    <div className="w-[30px] h-[30px] ">
                      {user.isAdmin && user._id == chat.createdByUser ? (
                        <Owner />
                      ) : user.isAdmin ? (
                        <Admin />
                      ) : null}
                    </div>
                  ) : null}
                </div>
                <div
                  className={
                    "w-full h-1/2 flex justify-end items-center gap-x-2 " +
                    `${
                      user._id == chat.createdByUser || !isCurrentUserAdmin
                        ? "hidden"
                        : ""
                    }`
                  }
                >
                  <button
                    type="button"
                    className={
                      "cursor-pointer " +
                      `${
                        user.isAdmin
                          ? "hover:text-red-500"
                          : "hover:text-green-500"
                      }`
                    }
                    onClick = {
                      async ()=>{
                        if( user.isAdmin ){
                          await dispatch(modifyAdminsAsync({
                            modifyAction:"delete",
                            admins:[user._id],
                          }));
                        }
                        else{
                          await dispatch(
                            modifyAdminsAsync({
                              modifyAction: "add",
                              admins:[user._id],
                            })
                          );
                        }
                      }
                    }
                  >
                    {user.isAdmin ? "Remove Admin" : "Make Admin"}
                  </button>
                  <div className="w-[1px] h-1/2 border-1"></div>
                  <button
                    type="button"
                    className="hover:text-red-500 hover:font-bold cursor-pointer"
                    onClick={async ()=>{
                      console.log("remove");
                      await dispatch(modifyMembersAsync({
                        modifyAction:"delete",
                        members:[user._id],
                      }));
                    }}
                  >
                    Remove Member
                  </button>
                </div>
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default GroupChatMembers;
