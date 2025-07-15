import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Outlet, useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
const UnProtectedPage = () => {
  const userId = useSelector((state) => state.auth.userId);
  const relativePath = useLocation();
  const navigate = useNavigate();
  console.log("Is in UnProtected");
  

  useEffect(() => {
    if (userId) {
      const path = relativePath.pathname.split("/");
      console.log("After Changing ", path, " ", path[path.length - 1])
      if (path[path.length - 1] == "login") {
        toast.warning("Already Logged In");
      }
    }
  }, [userId, location]);
  useEffect(()=>{
    if( userId ){
        navigate(-1);
    } 
  },[navigate]);
  return <Outlet />;
};

export default UnProtectedPage;
