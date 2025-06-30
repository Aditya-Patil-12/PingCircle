import './App.css'
// React and External Library Imports ====================
import { useState } from 'react'
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { ToastContainer } from 'react-toastify'; 
//=======================================================

// JSX Imports ====
import {
  HomePage,
  LandingPage,
  RegisterPage,
  LoginPage,
  ChatPage,
  VerificationPage,
  VerifyEmailPage,
  ResetPasswordPage,
  ForgotPasswordPage
} from "./pages";
// ================

// routes are first argument to createBrowserRouter [ ]
const router = createBrowserRouter([
  {
    path: "/",
    Component: HomePage,
  },
  {
    path: "/auth",
    Component: LandingPage,
    children: [
      {
        path: "login",
        index: true,
        Component: LoginPage,
      },
      {
        path: "register",
        Component: RegisterPage,
      },
      {
        path: "verifyEmail",
        Component: VerifyEmailPage,
      },
      {
        path: "verifyField",
        Component: VerificationPage,
      },
      {
        path: "recoveryPassword",
        Component: ForgotPasswordPage,
      },
      {
        path: "resetPassword",
        Component: ResetPasswordPage,
      },
    ],
  },
  {
    path: "/chats",
    Component: ChatPage,
  },
]);

function App() {
  return (
    <div className='App'>
      <RouterProvider router={router}/>
      <ToastContainer/>
    </div>
  );
}

export default App
