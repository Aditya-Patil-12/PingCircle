
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Outlet, useLocation } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import { toast } from 'react-toastify';
const ProtectedPage = () => {
    const userId = useSelector((state) => state.auth.userId);
    const relativePath = useLocation();

    useEffect(()=>{
      if( !userId ) {
        const path = relativePath.pathname.split("/");
        // console.log("After Changing ", path, " ", path[path.length - 1]);
        
        if( path[path.length-1] == "verifyEmail" ){
          toast.warning("Please Login First");
        }
      }
    },[userId,location]);
    console.log("IN ProtectedPage ", userId);
    
    if( !userId ){
      return <Navigate to="/auth/login" replace />;
    }
    return <Outlet/>;
}

export default ProtectedPage;
