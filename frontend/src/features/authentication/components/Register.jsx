//  React Imports ======
import { useEffect, useState } from "react";
import { useGoogleLogin } from "@react-oauth/google";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

// =====================

// Redux Imports =========
import { useSelector,useDispatch } from "react-redux";
import {
  createUserAsync,
  resetStatus,
  socialCheckUserAsync,
  showMeUserAsync,
} from "../AuthSlice";
// =======================

// CSS Imports ================
import "./authStyle.css";
// ============================


// JSX Imports =========
// =====================

// Material UI Imports =====
import { Button, TextField } from "@mui/material";
import { FcGoogle } from "react-icons/fc";
import { FaArrowRight } from "react-icons/fa";
import { styled } from "@mui/material/styles";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
// =====================

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  border: 2,
  bottom: 0,
  left: 0,
  whiteSpace: "wrap",
  width: 1,
});



const SignUp = () => {
  const dispatch = useDispatch();
  const auth = useSelector((state)=>state.auth);
  const [formInput, setFormInput] = useState({
    userName: "",
    email: "",
    password: '',
    phoneNo: "",
    confirmPassword: "",
    profilePic: null,
  });
  const navigate = useNavigate();
  // const [isProfilePhotoUploadLoading, setIsProfilePhotoUploadLoading] =
  //   useState(false);

  const handleGoogleLogin = useGoogleLogin({
    flow: "auth-code",
    onSuccess: async (codeResponse) => {
      console.log(codeResponse);
      const info = {code: codeResponse.code,};
      const resp = await dispatch(socialCheckUserAsync(info));
      console.log("resp ::::::::: ",await resp);
      if( await resp ){
        if( resp?.payload?.userId ){
          toast.success('Welcome\n');
          setTimeout(()=>{navigate('/chats')},2000);
        }
      }
      // const tokens = await axios.post(
      //   "http://localhost:5000/api/v1/auth/google",
      //   {
      //     code: codeResponse.code,
      //   }
      // );
    },
    onError: (errorResponse) => {
      toast.error(`${errorResponse} !`);
    },
    onNonOAuthError: (errorResponse) =>{
      toast.error(`Some non Auth Error ${errorResponse} !`);
    }
  });
  const handleChange = async (inputType, value) => {
    console.log(value, " ", value[0]);
    const obj = value[0];

    if (typeof value === "object" && value instanceof FileList) {
      // Use the first file directly
      setFormInput({ ...formInput,[inputType]:value[0] });
      toast.success('Profile Photo Selected Successfully');
      return ;
    }
    setFormInput({ ...formInput, [inputType]: value });
  };
  const submitHandler = async (e) => {
    e.preventDefault();

    for (let input in formInput) {
      console.log(input, " ", formInput[input]);
      if (!formInput[input]) {
        const emptyField = input;
        if (emptyField === "profilePic")
          toast.warning(`Please select a Profile Photo `);
        else toast.warning(`Please Provide Value for ${emptyField}`);
        return;
      }
    }
    const formData = new FormData();
    for(let input in formInput)
    formData.append(`${input}`, formInput[`${input}`]);
    console.log(Object.fromEntries(formData));
    const resp= await dispatch(createUserAsync(formData));
    console.log("next thing to focus at ",await resp);
    if( await resp ){
      const {userId,msg} = await resp.payload;
      if (userId) {
        toast.success(msg,{
          duration:2000,
        });
        // formData.reset();
        setTimeout(()=>{
          toast.info("Please Login");
          navigate("/auth/login")
        },2500)
      } else {toast.error(msg+" !\n Please Try Again"); resetStatus("idle");}
    }
    // const resp = await axios.post(
    //   "http://localhost:5000/api/v1/auth/register",
    //   formData
    // );
    // never works.....
    // const resp = await axios.post(
    //   "http://localhost:5000/api/v1/auth/register",
    //   formInput
    // );
    // console.log(resp);
  };
    useEffect(()=>{
      // dispatch my Action to seach
      const helper = async ()=>{
        const resp = await dispatch(showMeUserAsync());
        console.log(resp);
        if( resp.payload.success ){
          // show a popup to login with that User ......
          navigate("/auth/verifyEmail");
        }
      }
      helper();
    },[])
  console.log(auth);

  // useEffect(()=>{
  //   if (auth.status === "rejected" && !(auth?.userId) ) {
  //     toast.error(auth.serverMsg);      
  //   } else if (auth.status === "idle" && auth?.userId ) {
  //     toast.success(auth.serverMsg);      
  //     navigate("/login")
  //   }
  //   else{
  //     // toast.loading('Verifying Credentials');
  //   }
  // },[auth.status])
  console.log(auth);
  
  return (
    <section className="loginForm bg-white w-[30%] my-12 rounded-xl shadow-2xl">
      <form onSubmit={submitHandler} encType="multipart/for-data">
        <h1 className="text-3xl mt-5 ml-2">Register</h1>
        <div className="singleInput mt-10 mx-9">
          <TextField
            id="userNameInput"
            label="Username"
            variant="outlined"
            type="text"
            value={formInput.userName}
            onChange={(e) => handleChange("userName", e.target.value)}
          />
        </div>
        <div className="singleInput mt-10 mx-9">
          <TextField
            id="emailInput"
            label="Email"
            variant="outlined"
            type="email"
            value={formInput.email}
            onChange={(e) => handleChange("email", e.target.value)}
          />
        </div>
        <div className="singleInput mt-10 mx-9">
          <TextField
            id="passwordInput"
            label="Password"
            variant="outlined"
            type="password"
            value={formInput.password}
            onChange={(e) => handleChange("password", e.target.value)}
          />
        </div>
        <div className="singleInput mt-10 mx-9">
          <TextField
            id="confirmPasswordInput"
            label="Confirm Password"
            variant="outlined"
            type="password"
            value={formInput.confirmPassword}
            onChange={(e) => handleChange("confirmPassword", e.target.value)}
          />
        </div>
        <div className="singleInput mt-10 mx-9">
          <TextField
            id="phoneNoInput"
            label="Phone Number"
            variant="outlined"
            type="tel"
            value={formInput.phoneNo}
            onChange={(e) => handleChange("phoneNo", e.target.value)}
          />
        </div>
        <div className="singleInput mt-10 mx-9">
          <Button
            component="label"
            role={undefined}
            variant="contained"
            tabIndex={-1}
            startIcon={<CloudUploadIcon />}
            className="border-1 w-[200px]"
          >
            Upload Profile Photo
            <VisuallyHiddenInput
              type="file"
              accept="image/*"
              onChange={(event) =>
                handleChange("profilePic", event.target.files)
              }
              // multiple --> just for selecting multiple files ....
              // loading={isProfilePhotoUploadLoading}
            />
          </Button>
          {/* {
            formInput.profilePic &&  formInput.profilePic.length > 0 && 
            formInput.profilePic.map((file)=>{
              console.log(URL.createObjectURL(file)," ",file);
              
              return <img src={URL.createObjectURL(file)} alt="img" />
            })
          } */}
        </div>
        <div className="buttonContainer mt-10 flex justify-around">
          <Button type="submit" variant="contained" className="">
            Create A Ping Account
          </Button>
        </div>
        <div className="line w-[90%] border-1 mx-auto mt-3"></div>
        <div className="flex flex-col items-center mt-10 gap-2">
          <Button
            variant="outlined"
            className=""
            onClick={(e) =>{
              console.log("Clicked here \n");
              handleGoogleLogin()
              
            }}
          >
            <FcGoogle fontSize={"large"} className="mr-2 hover:rounded-4xl" />
            Continue with Google
          </Button>

          <Button variant="text" className="gap-1">
            <Link to="/login">Alread have an account</Link>
            <FaArrowRight />
          </Button>
        </div>
        {/* <div className='h-100'>

        </div> */}{" "}
      </form>
    </section>
  );
};

export default SignUp;

