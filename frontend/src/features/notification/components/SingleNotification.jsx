import { setSelectedChatId } from "../../chat/ChatSlice";
import { useDispatch } from "react-redux";
const SingleNotification = ({ notification }) => {
    const {dispatch} = useDispatch();
    console.log(notification);
    return (
        <div
        className="w-full min-h-[10px] cursor-pointer p-2 flex gap-x-2 hover:bg-gray-100"
        onClick={() => {
            (dispatch(setSelectedChatId(notification?._id)))
        }}
        >
        <div className="chatProfilePic w-1/10 h-full">
            <img
            src={notification["chatProfilePic"]}
            alt=""
            className="rounded-full"
            />
        </div>
        <div className="chatInfo w-9/10 h-full">
            <h1 className="font-bold">{notification.name}</h1>
            <p>{notification.latestMessagg}</p>
        </div>
        </div>
    );
};

export default SingleNotification
