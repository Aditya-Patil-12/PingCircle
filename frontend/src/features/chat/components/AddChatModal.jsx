import { useEffect, useState } from "react";
// Material UI Components/ Icon  ==============
import { TextField } from "@mui/material";
import {Button} from '@mui/material'
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
// =========================
//  JSX Imports ====================
import GroupModalContent from "./modalContent/GroupModalContent";
import OneToOneModalContent from "./modalContent/OneToOneModalContent";
import OptionsModalContent from "./modalContent/OptionsModalContent";
// =================================
const SingleUser = ({user}) =>{
    console.log(user);
    
    return (
      <div
        className="cursor-pointer p-2 flex gap-x-2 hover:bg-gray-100"
      >
        <div className="chatProfilePic w-1/10 h-full">
          <img src={user["chatProfilePic"]} alt="" className="rounded-full" />
        </div>
        <div className="chatInfo w-9/10 h-full">
          <h1 className="font-bold">{user.name}</h1>
        </div>
      </div>
    );
}
const AddChatModal = ({ setShowAddChatModal }) => {
    const [options,setOptions] = useState(0);
    console.log(options);
    
  return (
    <div
      className="w-full h-full chatModal bg-transperent absolute z-20"
      onClick={() => {
        // setShowAddChatModal(false);
      }}
    >
      <div
        className="w-[70%] h-[80%] relative bg-white rounded-xl shadow-2xl  top-[10%] left-[15%]"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        {options == 0 ? (
          <OptionsModalContent
            setShowAddChatModal={setShowAddChatModal}
            setOptions={setOptions}
          />
        ) : options == 1 ? (
          <OneToOneModalContent
            setShowAddChatModal={setShowAddChatModal}
            options={options}
            setOptions={setOptions}
          />
        ) : (
          <GroupModalContent
            setShowAddChatModal={setShowAddChatModal}
            options={options}
            setOptions={setOptions}
          />
        )}
      </div>
    </div>
  );
};

export default AddChatModal;
