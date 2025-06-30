import { Outlet } from 'react-router-dom';
import { Link } from 'react-router-dom';
const LandingPage = () => {
  return (
    // flex-col == > Horizontal Centering then items-center
    <div className="border-10 flex flex-col items-center">
      <nav
        className="landingPageNavbar border-1 mt-5
        w-100
       rounded-xl flex"
      >
        <div className="authLink border-1 w-[50%] text-center">
          <Link to="/auth/login"className="">Login / Sign In</Link>
        </div>
        <div className="authLink border-1 w-[50%] text-center">
          <Link to="/auth/register"className="">Register / Sign Up</Link>
        </div>
      </nav>


      <Outlet />
    </div>
  );
}

export default LandingPage
