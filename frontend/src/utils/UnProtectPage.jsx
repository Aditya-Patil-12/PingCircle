import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Outlet, useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";


// Redux Imports =========
import { useDispatch } from "react-redux";
import {
  showMeUserAsync,
} from "../features/authentication/AuthSlice";
// =======================
const UnProtectedPage = () => {
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.auth.userId);
  const relativePath = useLocation();
  const navigate = useNavigate();
  console.log("Is in UnProtected",userId);
  

  useEffect(() => {
    const helper = async () => {
      const resp = await dispatch(showMeUserAsync());
      // console.log(resp);
      if (resp.payload.success) {
        // show a popup to login with that User ......
        navigate("/auth/verifyEmail");
      }
    };
    if (!userId) {
      helper();
    } 
  }, []);


  useEffect(() => {
    if (userId) {
      const path = relativePath.pathname.split("/");
      console.log("After Changing ", path, " ", path[path.length - 1])
      if (path[path.length - 1] == "login") {
        // toast.warning("Already Logged In");
      }
    }
  }, [userId, location]);

  useEffect(()=>{
    if( userId ){
        navigate("/auth/verifyEmail");
    } 
  },[navigate]);
  return <Outlet />;
};

export default UnProtectedPage;
