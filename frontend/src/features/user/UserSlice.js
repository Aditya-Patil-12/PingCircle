import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  userId: null,
  userEmail: "aditypatil71@gmail.com",
  isEmailVerified: false,
  isLogin: false,
  serverMsg: "",
  status: "idle",
};

import {
} from "./UserAPI";

const createUserAsync = createAsyncThunk(
  "auth/createUserDetails",
  async (info, thunkAPI) => {
    console.log("Creating User in Thunk :", info);
    const { data, msg, success } = await createUser(info);
    // console.log("Creating User in Thunk Response:", response);
    if (!success) {
      // TODO : go for Register
      return thunkAPI.rejectWithValue({ msg });
    }
    return {
      userEmail: data.email,
      userId: data._id,
      isEmailVerified: data.isEmailVerified,
      msg,
    };
  }
);


// name , intialState reducers , extraReducers ......
export const authSlice = createSlice({
  name: "user",
  initialState,
  // exported as slice.actions .....
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(createUserAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createUserAsync.fulfilled, (state, action) => {
        console.log(
          "Updating userEmail and userId after createUser",
          action.payload
        );
        const { userEmail, userId, msg, isEmailVerified } = action.payload;
        state.userEmail = userEmail;
        state.userId = userId;
        state.isEmailVerified = isEmailVerified;
        state.serverMsg = msg;
        state.status = "idle";
      })
      .addCase(createUserAsync.rejected, (state, action) => {
        state.status = "rejected";
        console.log("In Rejected State of createUserAsync", action);
        state.serverMsg = action.payload.msg;
        state.userEmail = null;
        state.userId = null;
      })
  },
});

// reducer**s** turn into actions ....
export const { clearAuthUser, setIsLogin, resetStatus } = authSlice.actions;

export {
};

// import this reducer .......
export default userSlice.reducer;
 