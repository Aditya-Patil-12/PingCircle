import { Link } from "react-router-dom"; // JSX Imports =========
// 1)auth imports
// import {Login,SignUp} from '../features/authentication/components';
// =====================

const HomePage = () => {
  return (
    <div className="border-10 flex flex-col items-center">
      <nav
        className="landingPageNavbar border-1 mt-5
              w-100
             rounded-xl flex"
      >
        <div className="authLink border-1 w-[50%] text-center">
          <Link to="/auth/login" className="">
            Login / Sign In
          </Link>
        </div>
        <div className="authLink border-1 w-[50%] text-center">
          <Link to="/auth/register" className="">
            Register / Sign Up
          </Link>
        </div>
      </nav>

      <header className="flex flex-row mt-5">
        <div className="info inline-block lg:w-[50%] lg:mx-auto">
          <div className="h-full border-1 flex items-center justify-center">
            <div>
              <h1 className="text-3xl">Welcome to Ping Circle</h1>
              <h3>Connect one-on-one or with everyone — all in one place.</h3>
              <h3>Powering both Direct And Group Chat</h3>
            </div>
          </div>
        </div>
        <div className="banner hidden lg:w-[50%] lg:inline-block">
          <img
            src="./logo_transperent.png"
            alt="LandingPageLogo"
            className="w-full h-full bg-transparent"
          />
        </div>
      </header>
      <footer></footer>
    </div>
  );
};

export default HomePage;
