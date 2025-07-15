import { memo,useState } from "react";
import NotificationsSharpIcon from "@mui/icons-material/NotificationsSharp";
import SingleNotification from "./SingleNotification";
import RemoveIcon from "@mui/icons-material/Remove";
const data = [
    { 
      id:1,
      name: "Aditya",
      latestMessagg: "How Are You",
      chatProfilePic:
        "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
    },
    { 
      id:2,
      name: "Navin",
      latestMessagg: "How Are You ?",
      chatProfilePic:
        "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
    },
    { 
      id:3,
      name: "Shakers",
      latestMessagg: "What' going bro",
      chatProfilePic:
        "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
    },
    { 
      id:4,
      name: "Coding & Concept",
      latestMessagg: "Todays' Lecture on React",
      chatProfilePic:
        "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
    },
    { 
      id:5,
      name: "IIIT Pune Offial Info",
      latestMessagg: "No class of Mahendra",
      chatProfilePic:
        "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
    },
];


const NotificationModal = memo(() =>{
//     console.log("Notification Modal ::::::::::::::");
// // console.log(data);


    return (
      <div className="w-[300px] h-[150px] absolute bg-white right-5 top-10 rounded-xl shadow-2xl border-1 overflow-y-auto z-10">
        {data.map((notification) => {
          return <SingleNotification notification={notification} />;
        })}
      </div>
    );
});


const Notification = memo(() => {
    console.log("Component Rendered ::::::::::::::");
    const [showModal, setShowModal] = useState(false);
    console.log("Abe", showModal);
    const numberofNotifications = 5;
    return (
    <div className="relative ">
      <button
        type="button"
        className="cursor-pointer"
        onClick={() => setShowModal(!showModal)}
      >
        {
            (!showModal) ? 
            (
                <div className="relative">
                    <NotificationsSharpIcon  />
                    {
                        numberofNotifications == 0 ? 
                        (null) :
                (<div 
            className="absolute bg-red-600 w-5 rounded-[100%] -top-1 left-[80%]">
                        {numberofNotifications}
                    </div>)
                    }
                </div>
            )
            :(
                <RemoveIcon/>
            )   
        }
      </button>
        {
            showModal ? (<NotificationModal/>):(null)
        }
    </div>
  );
})

export default Notification