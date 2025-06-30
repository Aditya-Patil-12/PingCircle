// React Imports Normal Library imports =====
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
// ==========================================

// MUI Imports =======================
import { Button } from "@mui/material";
// ===================================

// Redux Imports =========
import { useDispatch, useSelector } from "react-redux";
import { startEmailVerificationOfUserAsync } from "../AuthSlice";
// =======================

const VerifyEmail = () => {
  const navigate = useNavigate();
  const [isEmailSent, setIsEmailSent] = useState(false);
  const auth = useSelector((state) => state.auth);
  console.log(auth);

  const dispatch = useDispatch();
  // if (auth.isEmailVerified) {

  //   navigate("/chats");
  // }
  useEffect(() => {
    if (auth.isEmailVerified) {
      navigate("/chats");
    }
  }, [auth.isEmailVerified]);
  return !isEmailSent ? (
    <div className="mt-10 mb-5 text-center">
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
