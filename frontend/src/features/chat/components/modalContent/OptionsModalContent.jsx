import { Button } from "@mui/material";
const OptionsModalContent = ({ setShowAddChatModal, setOptions }) => {
  return (
    <div className="w-full h-full over px-2">
      <div className="closeIcon text-right h-1/20">
        <button
          className="cursor-pointer"
          onClick={() => {
            setShowAddChatModal(false);
          }}
        >
          Close
        </button>
      </div>
      <div className="border-1 text-center h-19/20">
        <div className="h-1/5 flex items-center justify-center">
          <h1 className="text-xl font-bold ">Please Choose To Connect ? </h1>
        </div>
        <div className="flex flex-col h-4/5">
          <div className="h-1/3 w-1/2 mx-auto flex justify-center items-end">
            <Button
              variant="outlined"
              className=""
              onClick={() => {
                setOptions(1);
              }}
            >
              Direct Ping
            </Button>
          </div>
          <div className="h-1/3 w-1/2 mx-auto flex justify-center items-center">
            <h1>OR</h1>
          </div>
          <div className="h-1/3 w-1/2 mx-auto flex justify-center items-start ">
            <Button
              variant="outlined"
              className=""
              onClick={() => {
                setOptions(2);
              }}
            >
              Group Chat Ping
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};


export default OptionsModalContent;
