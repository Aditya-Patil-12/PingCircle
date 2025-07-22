import { useSelector,useDispatch } from "react-redux"
import { useState } from "react";
import { logoutUserAsync } from "../features/authentication/AuthSlice";
import { resetAuth } from "../features/authentication/AuthSlice";
import { resetChat } from "../features/chat/ChatSlice";
import { resetUser } from "../features/user/UserSlice";
import { resetMessage } from "../features/messsage/MessageSlice";
const ProfilePage = () => {
  const dispatch = useDispatch();
  const [isPicSelected,setIsPicSelected] = useState(false);
  const user = useSelector((state)=>state.user);
  console.log(user);
  console.log(isPicSelected);
  
  return (
    <div className="relative max-h-screen max-w-screen border-1">
      <div
        className={`${
          isPicSelected ? "absolute " : "hidden"
        }   z-100 flex justify-center items-center w-full h-full`}
        onClick={() => setIsPicSelected(!isPicSelected)}
      >
        <div className="w-[60%] h-[90%] rounded-md overflow-hidden">
          <img
            className="w-full h-full cover"
            src={user.profilePic}
            alt="Profile image"
            onClick={(e) => {
              e.stopPropagation();
            }}
          />
        </div>
      </div>
      <div class="bg-gray-100 min-h-screen flex items-center justify-center p-4">
        <div class="max-w-md w-full bg-white rounded-xl  shadow-md overflow-hidden">
          {/* <!-- Header with background --> */}
          <div class="h-24 bg-gradient-to-r from-blue-600 to-blue-400"></div>

          {/* <!-- Profile content --> */}
          <div class="px-6 py-4">
            {/* <!-- Profile image centered between header and content --> */}
            <div class="flex justify-center -mt-16 mb-4">
              <button
                type="button"
                className="cursor-pointer "
                onClick={() => setIsPicSelected(!isPicSelected)}
              >
                <img
                  class="w-24 h-24 rounded-full border-4 border-white object-cover shadow-lg"
                  src={user.profilePic}
                  alt="Profile image"
                />
              </button>
            </div>

            {/* <!-- Name and title --> */}
            <div class="text-center mb-4">
              <h2 class="text-xl font-bold text-gray-800">{user.userName}</h2>
              <p class="text-sm text-gray-600">{"Description"}</p>
            </div>

            {/* <!-- Bio section --> */}
            <div class="mb-6">
              <p class="text-gray-700 text-center">{user.userEmail}</p>
            </div>

            {/* <!-- Button --> */}
            <div class="flex justify-center">
              <button class="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-6 rounded-full transition duration-300"
              onClick={
                async ()=>{
                  await dispatch(logoutUserAsync());
                  await dispatch(resetAuth());
                  await dispatch(resetChat());
                  await dispatch(resetUser());
                  await dispatch(resetMessage());
                }
              }
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage
