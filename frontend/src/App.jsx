import './App.css'
// React and External Library Imports ====================
import { Component, useState } from 'react'
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { ToastContainer } from 'react-toastify'; 
//=======================================================

// JSX Imports ====
import ProtectedPage from './utils/ProtectedPage';
import {
  HomePage,
  LandingPage,
  RegisterPage,
  LoginPage,
  ChatPage,
  VerificationPage,
  VerifyEmailPage,
  ResetPasswordPage,
  ForgotPasswordPage,
  AuthPage,
  ProfilePage,
} from "./pages";
import UnProtectedPage from './utils/UnProtectPage';
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
        Component: UnProtectedPage,
        children: [
          {
            index: true,
            Component: LoginPage,
          },
        ],
      },
      {
        path: "register",
        Component: RegisterPage,
      },
      {
        // this is protected .....
        Component: ProtectedPage,
        children: [
          {
            path: "verifyEmail",
            Component: VerifyEmailPage,
            index:true,
          },
        ],
      },
      {
        // this has to be protecteed , plus cookies should have time >= verificationTokenExpirationTime
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
    Component: ProtectedPage,
    children: [
      {
        index: true,
        Component: ChatPage,
      },
    ],
  },
  {
    path: "/profile",
    Component: ProtectedPage,
    children: [
      {
        index: true,
        Component: ProfilePage,
      },
    ],
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
