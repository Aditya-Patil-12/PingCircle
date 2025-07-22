import { useDispatch,useSelector } from "react-redux";
const SingleMessage  =  ({message,userId}) =>{
  console.log(message.sender," ",userId);
  return (
    <div className={""}>
      <div
        className={
          "flex border-1 m-2 px-2 rounded-md w-full  " +
          `${userId == message.sender ? "justify-end" : "justify-start"}`
        }
      >
        <div
          className={ 
            "border-1 p-2 rounded-md max-w-1/2 " +
            `${userId == message.sender ? "bg-green-400" : "bg-blue-400"}`
          }
        >
          <h1 className="">{message.content}</h1>
        </div>
      </div>
    </div>
  );
}
const ChatMessages = ({ seeChatDetails }) => {
    const messages =  useSelector((state)=>state.message.messages);
    console.log(messages);
    const userId = useSelector((state)=>state.user.userId);
    
    return (
      <div className="specialMessage w-full h-full flex flex-col border-6 overflow-y-scroll ">
        { messages &&   
            messages.map((message) => {
            return <SingleMessage key={message._id} message={message} userId={userId}/>;
            })
        }
      </div>
    );
};

export default ChatMessages
