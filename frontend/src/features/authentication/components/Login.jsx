//  React Imports ======
import {
    useState,useEffect
} from 'react'
import {Link} from 'react-router-dom'
import { useGoogleLogin } from "@react-oauth/google";
import { toast } from "react-toastify";
import { useNavigate } from 'react-router-dom';
// =====================

// CSS Imports ================
import './authStyle.css'
// ============================

// Redux Imports =========
import { useSelector,useDispatch } from "react-redux";
import {
  checkUserAsync,
  resetStatus,
  showMeUserAsync,
  socialCheckUserAsync,
} from "../AuthSlice";
// =======================

// JSX Imports =========
// =====================

// Material UI Imports =====
import {Button,TextField} from '@mui/material'
import { FcGoogle } from 'react-icons/fc';
import { FaArrowRight } from "react-icons/fa";
// =====================



const Login = () => {
    const auth = useSelector((state)=>state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [formInput,setFormInput] = useState({
        email:'',
        password:'',
    });
    const handleChange = (inputType,value) =>{
        setFormInput({ ...formInput, [inputType]: value }); 
    }
    const submitHandler = async (e )=>{
        e.preventDefault();
        
        for(let input in formInput){
            console.log(input," ",formInput[input])
          if (!formInput[input]) {
            toast.warning(`Please Provide Value for ${emptyField}`);
          return;
          }
        }
        const resp= await dispatch(checkUserAsync(formInput));
        console.log("next thing to focus at ", resp);
        if( resp ){
          const {userId,msg} = await resp.payload;
          if (userId) {
            toast.success(msg,{
              duration:1000,
            });
            setTimeout(()=>{
              navigate("/auth/verifyEmail")
            },1000)
          } else {toast.error(msg+" !\n Please Try Again"); resetStatus("idle");}
        }
    }
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
    // console.log(formInput);

  return (
    <section className="loginForm bg-white w-[30%] my-12 rounded-xl shadow-2xl">
      <form onSubmit={submitHandler}>
        <h1 className='text-3xl mt-5 ml-2'>Login Credentials</h1>
        <div className="singleInput mt-10 mx-9">
          <TextField 
          id="emailInput" 
          label="Email" 
          variant="outlined"
          type="email"
          value={formInput.email}
          onChange={(e)=>handleChange("email",e.target.value)}
          />
        </div>
        <div className="singleInput mt-10 mx-9">
          <TextField 
          id="passwordInput" 
          label="Password" 
          variant="outlined"
          type="password"
          value={formInput.password}
          onChange={(e)=>handleChange("password",e.target.value)}
          />
          <div className="text-right">
            <Button variant='text' size='small' onClick={()=>{
              navigate("/auth/recoveryPassword");
            }}>
              Forgot Password
            </Button>
          </div>
        </div>
        <div className="buttonContainer mt-10 flex justify-around">
          <Button type="submit "variant="contained" className=''>Login</Button>
          <Button variant="contained" className=''>Login As Guest</Button>
        </div>

        <div className="line w-[90%] border-1 mx-auto mt-3"></div>

        <div className='flex flex-col items-center mt-10 gap-2'>
          <Button variant="outlined" className='' onClick={(e)=>{
            handleGoogleLogin()
          }}>
            {/* TODO : CLoud*/}
            <FcGoogle fontSize={"large"} className='mr-2 hover:rounded-4xl'/>
            Continue with Google
          </Button>
          <Button variant="text" className='gap-1'>
            <Link to="/register">
              Create An Account
            </Link>
            <FaArrowRight/>
          </Button>
        </div>
        {/* <div className='h-100'>

        </div> */}
        {" "}
      </form>
    </section>
  );
}

export default Login;