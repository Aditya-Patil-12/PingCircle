import { configureStore , combineReducers } from "@reduxjs/toolkit";

import authReducer from '../features/authentication/AuthSlice'
export default configureStore({
    reducer:{
        auth:authReducer,
    }
})