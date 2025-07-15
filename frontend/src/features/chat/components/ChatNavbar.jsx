import {Button} from '@mui/material'
import { FaPlus } from "react-icons/fa";
import { Link } from 'react-router-dom';
import Notification from '../../notification/components/Notification';
const ChatNavbar = ({ showAddChatModal,setShowAddChatModal }) => {
  return (
    <div className="w-full h-full bg-white ">
      <div className="h-full flex  justify-between px-2 ">
        <div className="w-1/3 text-left">
          <div className="hidden lg:block">
            <Button
              variant="text"
              onClick={() => {
                if (!showAddChatModal) setShowAddChatModal(true);
              }}
            >
              {" "}
              Create & Connect
            </Button>
          </div>
          <div className="lg:hidden">
            <Button
              variant="text"
              onClick={() => {
                if (!showAddChatModal) setShowAddChatModal(true);
              }}
            >
              {" "}
              <FaPlus />{" "}
            </Button>
          </div>
        </div>
        <div className="text-center ">
          <h1 className="">Ping Circle</h1>
        </div>
        <div className="personal h-full w-1/3">
          <div className="justify-self-end h-full w-[100px] flex justify-around items-center py-1">
            <Notification />
            <Link to="/profile" className="h-full cursor-pointer">
              <img
                src="https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"
                alt=""
                className="w-full h-full rounded-full cursor-pointer"
              />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatNavbar


