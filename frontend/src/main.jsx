// ALWAYS VITE_  => While creating environment variable  ....
const clientId=import.meta.env.VITE_GOOGLE_CLIENT_ID ;
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

// Redux =====================
import {Provider} from 'react-redux'
import store from './.config/store.js'
// ===========================

// reactOAuth Import ===============
import { GoogleOAuthProvider } from "@react-oauth/google";
import { toast } from "react-toastify";
// ============================

// JSX imports ================
import App from "./App.jsx";
// ============================

// console.log(clientId);

// console.log(window.origin)
createRoot(document.getElementById("root")).render(
  // <StrictMode>
    <GoogleOAuthProvider clientId={clientId} onScriptLoadSuccess={()=>{
      console.log("Google Consent Screen Loaded Successfully.......................");
    }}
    onScriptLoadError={()=>{
      console.log("Loading Google Login Script Failed .....");
      toast.error("Please Reload the Page and try to Continue With Google Again !!!!!!")
    }}
    >
      <Provider store={store}>
        <App />
      </Provider>
    </GoogleOAuthProvider>
  // {/* </StrictMode> */}
);

