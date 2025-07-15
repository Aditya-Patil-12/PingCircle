import { configureStore , combineReducers } from "@reduxjs/toolkit";

import authReducer from '../features/authentication/AuthSlice'
import chatReducer from '../features/chat/ChatSlice';
export default configureStore({
    reducer:{
        auth:authReducer,
        chat:chatReducer,
    }
})