import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  userId: null,
  userName:null,
  profilePic:null,
  chats:null,
  userEmail: null,
  isEmailVerified: false,
  serverMsg: "",
  status: "idle",
};

import { searchUsers , showCurrentUser ,temp } from "./UserAPI";

const searchUserAsync = createAsyncThunk(
  "user/searchUserDetails",
  async (info, thunkAPI) => {
    console.log("searchUserDetails in Thunk :", info);
    const resp = await searchUsers (info);
    
    const { data, msg, success } = await resp;
    console.log("searchUserAsync in Thunk Response:", await data);
    if (!success) {
      // TODO : go for Register
      return thunkAPI.rejectWithValue({ msg });
    }
    return await {
      users : data,
      msg,
    };
  }
);

const showCurrentUserAsync = createAsyncThunk(
  "user/showCurrentUserDetails",
  async (_, thunkAPI) => {
    console.log("showCurrentUserDetails in Thunk :");
    const { data, msg, success } = await showCurrentUser();
    console.log("showCurrentUserDetails in Thunk Response:" );
    if (!success) {
      // TODO : go for Register
      return thunkAPI.rejectWithValue({ msg });
    }
    return {
      ...data,
      msg,
    };
  }
);


// name , intialState reducers , extraReducers ......
export const userSlice = createSlice({
  name: "user",
  initialState,
  // exported as slice.actions .....
  reducers: {
    addChatsToUser : (state,action) =>{
      console.log(action.payload);
      const temp = action.payload;      
      state.chats = [...state.chats,temp];
    },
    resetUser : (state) =>{
      state.userId = null;
      state.userName = null;
      state.profilePic = null;
      state.chats = null;
      state.userEmail = null;
      state.isEmailVerified = false;
      state.serverMsg = null;
      state.status="idle";
    },
    deleteAChat : (state,action) =>{
      console.log("Direct ACtion ::::::::::::_++++:+_P:_+:  ",action.payload);
      
      const chats = state.chats;
      const newChats = chats.filter((chat)=>(chat.chatId != action.payload));
      state.chats = newChats;
    }
  },
  extraReducers: (builder) => {
    builder
    .addCase(showCurrentUserAsync.pending, (state) => {
      state.status = "loading";
    })
    .addCase(showCurrentUserAsync.fulfilled, (state, action) => {
      console.log("In Builder of showCurrentUserAsync", action.payload);
      const {
        _id,
        userName,
        email,
        isEmailVerified,
        profilePic,
        chats,
        msg,
      } = action.payload;
      state.userId = _id;
      state.userName = userName;
      state.profilePic = profilePic;
      state.chats = chats;
      state.userEmail = email;
      state.isEmailVerified = isEmailVerified;
      state.serverMsg = msg;
      state.status = "idle";
    })
    .addCase(showCurrentUserAsync.rejected, (state, action) => {
      state.status = "rejected";
      console.log("In Rejected State of createUserAsync", action);
      state.serverMsg = action.payload.msg;
      state.userEmail = null;
      state.userId = null;
    })
    .addCase(searchUserAsync.pending, (state) => {
      state.status = "loading";
    })
    .addCase(searchUserAsync.fulfilled, (state, action) => {
      console.log(
        "Searching User Async ",
        action.payload
      );

      const { msg } = action.payload;
      state.serverMsg= msg;
      state.status = "idle";
    })
    .addCase(searchUserAsync.rejected, (state, action) => {
      state.status = "rejected";
      console.log("In Rejected State of searchUserAsync", action);
      state.serverMsg = action.payload.msg;
      state.userEmail = null;
      state.userId = null;
    });
  },
});

// reducer**s** turn into actions ....
export const {
  clearAuthUser,
  setIsLogin,
  resetStatus,
  addChatsToUser,
  resetUser,
  deleteAChat,
} = userSlice.actions;

export { searchUserAsync,showCurrentUserAsync };

// import this reducer .......
export default userSlice.reducer;
 