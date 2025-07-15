const SingleUser = ({ user, handleMembersChange, setSearchUserName }) => {

  // console.log("++++++++++++++++_++++_+_+__+_+_+", user);

  return (
    <div
      className="cursor-pointer p-2 flex gap-x-2 hover:bg-gray-100"
      onClick={() => {
        handleMembersChange(user, "add");
        setSearchUserName("");
      }}
    >
      <div className="chatProfilePic w-1/10 h-full">
        <img src={user["chatProfilePic"]} alt="" className="rounded-full" />
      </div>
      <div className="chatInfo w-9/10 h-full">
        <h1 className="font-bold">{user.userName}</h1>
      </div>
    </div>
  );
};

export default SingleUser;
