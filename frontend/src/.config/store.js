import { configureStore , combineReducers } from "@reduxjs/toolkit";

import authReducer from '../features/authentication/AuthSlice'
import chatReducer from '../features/chat/ChatSlice';
import userReducer from '../features/user/UserSlice';
import messageReducer from '../features/messsage/MessageSlice';
export default configureStore({
  reducer: {
    auth: authReducer,
    chat: chatReducer,
    user: userReducer,
    message: messageReducer,
  },
});