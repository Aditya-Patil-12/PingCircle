import { Link } from "react-router-dom"; // JSX Imports =========
// 1)auth imports
// import {Login,SignUp} from '../features/authentication/components';
// =====================

const HomePage = () => {
  // const [currentYear, seturrentYear] = useState(second)
  
  return (
    <div className="head">
      <div className="flex flex-col items-center h-screen overflow-hidden">
        {/* Navbar  */}
        <div className="homePageNavbarContainer border-1 w-full h-1/12 flex justify-center items-center">
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

        {/* The Banner Section  */}
        <header className="w-full h-11/12">
          <div className="h-full lg:flex lg:flex-row">
            <div className="h-full lg:w-[50%] lg:mx-auto">
              <div className="h-full border-8 flex items-center justify-center text-center lg:text-left">
                <div>
                  <h1 className="text-3xl">Welcome to Ping Circle</h1>
                  <h3>
                    Connect one-on-one or with everyone — all in one place.
                  </h3>
                  <h3>Powering both Direct And Group Chat</h3>
                </div>
              </div>
            </div>
            <div className="h-full hidden lg:w-[50%] lg:inline-block">
              <img
                src="./logo_transperent.png"
                alt="LandingPageLogo"
                className="w-full h-full object-cover bg-transparent"
              />
            </div>
          </div>
        </header>
      </div>
      <footer class="bg-transparent flex flex-col items-center pt-5">
        <div class="container flex flex-wrap justify-center gap-x-12">
          <div className="smallLogo">
            <h1>Small Logo Here</h1>
          </div>
          <div class="links">
            <div class="flex justify-center gap-x-4 text-center">
              <div class="">
                <Link
                  href="#"
                  class="inline-block text-lg text-gray-500 hover:text-gray-600 font-medium"
                >
                  Terms
                </Link>
              </div>
              <div class="">
                <Link
                  href="#"
                  class="inline-block text-lg text-gray-500 hover:text-gray-600 font-medium"
                >
                  Privacy
                </Link>
              </div>
              <div class="">
                <Link
                  href="#"
                  class="inline-block text-lg text-gray-500 hover:text-gray-600 font-medium"
                >
                  Contact Us
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div class="container px-4 mx-auto">
          <p class="py-5 md:pb-10 text-md text-gray-400 font-medium text-center">
            © {new Date().getFullYear()} Ping Circle All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
          // <div className="banner hidden lg:w-[50%] lg:inline-block">
            // <img
            //   src="./logo_transperent.png"
            //   alt="LandingPageLogo"
            //   className="w-full h-full bg-transparent"
            // />
          // </div>






