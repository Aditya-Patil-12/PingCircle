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
import { useSelector,useDispatch } from "react-redux";
import { startResetPasswordOfUserAsync, resetStatus } from "../AuthSlice";
// =======================

// JSX Imports =========
// =====================

// Material UI Imports =====
import {Button,TextField} from '@mui/material'
// =====================



const ForgotPassword = () => {
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email,setEmail] = useState("");
  console.log(email);
  
  const [isSubmitted,setIsSubmitted]= useState(false);
  // console.log(formInput);
  const submitHandler = async (e) => {
    e.preventDefault();
    if( !email ) return ;
    setIsSubmitted(true);
    const resp = await dispatch(startResetPasswordOfUserAsync(email));
    console.log("Awaiting for resp ",await resp);
    
    if( resp.payload ){
        // console.log(payload);
        const msg= resp.payload.msg;
        toast.success(`${msg} !!!`);
    }
  };


  return (
    <section className="loginForm bg-white w-[30%] my-12 rounded-xl shadow-2xl">
        {
            (!isSubmitted) ? 
            (<form onSubmit={submitHandler}>
        <h1 className="text-3xl mt-5 ml-2">Password Recovery</h1>
        <div className="singleInput mt-10 mx-9">
          <TextField
            id="emailInput"
            label="Email"
            variant="outlined"
            value={email}
            onChange = {(e)=>setEmail(e.target.value)}
            type="email"
          />
        </div>
        <div className="buttonContainer my-10 flex justify-around">
          <Button type="submit " variant="contained" className="">
            Recover
          </Button>
        </div>
            </form>) : ( <h1>Please Check your Email for Setting Up New Password</h1> )
        }
    </section>
  );
};

export default ForgotPassword;