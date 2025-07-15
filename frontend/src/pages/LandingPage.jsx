import { useEffect } from "react";
import { Link,Outlet ,useNavigate ,useLocation} from "react-router-dom";
const LandingPage = () => {
  const navigate = useNavigate();
  const path = useLocation();
  useEffect(()=>{
    console.log(path);
    
    if( path.pathname == "/auth"){
      navigate("/auth/login")
    }
  },[]);

  return (
    // flex-col == > Horizontal Centering then items-center
    <div className="flex flex-col items-center">
      <div className="homePageNavbarContainer w-full h-[45px] flex justify-center items-center">
        {/* flex justify-center items-center */}
        <nav className="landingPageNavbar border-1 w-100 rounded-xl flex">
          <div className="authLink w-[50%] text-center border-r-2">
            <Link to="/auth/login" className="">
              Login / Sign In
            </Link>
          </div>
          <div className="authLink w-[50%] text-center border-l-2">
            <Link to="/auth/register" className="">
              Register / Sign Up
            </Link>
          </div>
        </nav>
      </div>

      <Outlet />
    </div>
  );
}

export default LandingPage
