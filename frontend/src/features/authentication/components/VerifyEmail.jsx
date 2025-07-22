// React Imports Normal Library imports =====
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Navigate, useNavigate } from "react-router-dom";
// ==========================================

// MUI Imports =======================
import { Button } from "@mui/material";
// ===================================

// Redux Imports =========
import { useDispatch, useSelector } from "react-redux";
import { startEmailVerificationOfUserAsync } from "../AuthSlice";
import { showCurrentUserAsync } from "../../user/UserSlice";
// =======================

const VerifyEmail = () => {
  const navigate = useNavigate();
  const [isEmailSent, setIsEmailSent] = useState(false);
  const auth = useSelector((state) => state.auth);
  console.log("Just after Imports ::: ", auth);
  const dispatch = useDispatch();

  // useEffect(() => {
  //   console.log("I in useEffect :: ",auth);
  //   // setTimeout(async ()=>{
  //     if (auth.isEmailVerified) {
  //         console.log("ready to navigate :: ",auth);
  //         const help = async () =>{
  //           await dispatch(showCurrentUserAsync());
  //           navigate("/chats");
  //         }
  //         help();
  //       }
  //       if( !auth.isLogin ){
  //         navigate('/auth/login');
  //       }
  //       // },2000);
  //     }, []);
    if( auth.isEmailVerified ){
      // we can need tos showUser
      const help = async () => await dispatch(showCurrentUserAsync());
      help();
      return <Navigate to="/chats"/>;        
    }
    if( !(auth.isLogin) || !(auth.userId) ){
      return <Navigate to="/auth/login"/>;        
    }
  return !isEmailSent ? (
    <div className="mt-10 mb-5 text-center">
      <Button onClick={()=>{
        navigate('/auth/login');
      }}>
        CLick
      </Button>
      <h1 className="text-3xl font-bold mb-5">
        Verify your Email by clicking on below button
      </h1>
      <Button
        variant="contained"
        onClick={() => {
          dispatch(startEmailVerificationOfUserAsync());
          setIsEmailSent(true);
        }}
        disabled={isEmailSent}
      >
        Send Verification Link
      </Button>
    </div>
  ) : (
    <h1 className="text-3xl font-bold my-10">
      Please Check Email for Verification Link
    </h1>
  );
};

export default VerifyEmail;
