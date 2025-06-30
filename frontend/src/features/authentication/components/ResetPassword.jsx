//  React Imports ======
import {
    useState
} from 'react'
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
// =====================

// CSS Imports ================
import './authStyle.css'
// ============================

// Redux Imports =========
import {useDispatch } from "react-redux";
import { checkVerificatonTokenFieldOfUserAsync,resetStatus } from "../AuthSlice";
// =======================

// JSX Imports =========
// =====================

// Material UI Imports =====
import {Button,TextField} from '@mui/material'
// =====================



const ResetPassword = ({query}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formInput,setFormInput] = useState({newPassword:"",confirmNewPassword:""});
  const [isSuccess, setIsSuccess] = useState(false);

  const handleChange = (input,inputValue)=>{
    setFormInput({...formInput,[input]:inputValue});
  };
  const submitHandler = async (e) => {
    e.preventDefault();
    const {newPassword,confirmNewPassword}  = formInput;
    console.log(formInput);
    if (!confirmNewPassword || !newPassword){
        toast.warning("Please Provide All Values");
        return ;
    }
    if (confirmNewPassword != newPassword) {
      toast.warning("New Password and New Confirm Password doesn't match !!! ");
      return;
    }
    const resp = await dispatch(checkVerificatonTokenFieldOfUserAsync({query,body:{password:newPassword}}));
    if( resp.payload ){
        const {msg} = resp.payload;
        toast.success(msg);
        setIsSuccess(true);
        // setTimeout(() => {
        //     navigate("/auth/login")
        // }, (2000));
    }
    // setIsSuccess(true);
};


  return (
    <section className="loginForm bg-white w-[100%]  p-5 my-12 rounded-xl shadow-2xl">
      {!isSuccess ? (
        <form onSubmit={submitHandler}>
          <h1 className="text-3xl mt-5 ml-2">Password Recovery</h1>
          <div className="singleInput my-10">
            <TextField
              id="newPassword"
              label="New Password"
              variant="outlined"
              value={formInput.newPassword}
              onChange={(e) => handleChange("newPassword", e.target.value)}
              type="password"
            />
          </div>
          <div className="singleInput my-10">
            <TextField
              id="confirmNewPassword"
              label="Confirm New Password"
              variant="outlined"
              placeholder="Please Retype New Password"
              value={formInput.confirmNewPassword}
              onChange={(e) =>
                handleChange("confirmNewPassword", e.target.value)
              }
              type="password"
            />
          </div>
          <div className="buttonContainer my-10 flex justify-around">
            <Button type="submit " variant="contained" className="">
              Reset
            </Button>
          </div>
        </form>
      ) : (
        <h1>Password Changed Successfully || Please Login Again!!! </h1>
      )}
    </section>
  );
};

export default ResetPassword;