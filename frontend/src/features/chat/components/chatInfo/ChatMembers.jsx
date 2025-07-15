import Owner from "./Owner";
import Admin from "./Admin";
const ChatMembers = ({data}) => {
  return <div>{
    data.members.map((user)=>{
        return (
          <div
            className="w-full h-[75px] cursor-pointer p-2 flex gap-x-2 hover:bg-gray-100  "
            onClick={() => {}}
          >
            <div className="chatProfilePic w-1/10 h-full">
              <img
                src={user["chatProfilePic"]}
                alt=""
                className="rounded-full w-full h-full contain"
              />
            </div>
            <div className="chatInfo w-9/10 flex justify-between ">
              <h1 className="font-bold">{user.userName}</h1>
              {
                user._id <= 2 ? (              
                <div className="w-[30px] h-[30px] ">
                    {
                        user._id == 1 ? (<Owner/>) : (
                            user._id == 2 ? (<Admin/>) : (null)
                        )
                    }
              </div>
              ) :(null)
              }
            </div>
          </div>
        );
    })
  }</div>;
}

export default ChatMembers
