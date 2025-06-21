import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

// Chakara Provider ============
import { ChakraProvider } from "@chakra-ui/react";
// =============================

// Auth0 Import ===============
import {Auth0Provider} from '@auth0/auth0-react' 
// ============================

// JSX imports ================
import App from './App.jsx'
// ============================

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ChakraProvider>
      <Auth0Provider
        domain="dev-ve28tt10m52ky88p.us.auth0.com"
        clientId="ZF6Rd1oxIdg66yZuJjnjqkUot1qArA2S"
        authorizationParams={{
          redirect_uri: window.location.origin+"/chats",
        }}
      >
        <App />
      </Auth0Provider>
    </ChakraProvider>
  </StrictMode>
);
