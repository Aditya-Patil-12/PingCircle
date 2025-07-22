import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  chatId: null,
  members:[],
  admins:[],
  chatType:null,
  chatName:null,
  createdByUser:null,
  chatProfilePic:null,
  status: "idle",
};

import {
  createChatAPI,
  createSelfChatAPI,
  getChatAPI,
  modifyMembersAPI,
  modifyAdminsAPI,
  exitChatAPI,
} from "./ChatAPI";
const createChatAsync = createAsyncThunk(
  "chat/createChatDetails",
  async (info, thunkAPI) => {
    console.log("Creating Group in Thunk :", info);
    const { data, msg, success } = await createChatAPI(info);
    console.log("Creating Group in Thunk Response:", { data, msg, success });
    if (!success) {
      // TODO : go for Register
      return thunkAPI.rejectWithValue({ msg });
    }
    return {
      ...data,
      success:true,
      msg,
    };
  }
);
const getChatAsync = createAsyncThunk(
  "chat/getChatDetails",
  async (id, thunkAPI) => {
    const { data, msg, success } = await getChatAPI(id);
    console.log("Creating Group in Thunk Response:", { data, msg, success });
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
const createSelfChatAsync = createAsyncThunk(
  "chat/createSelfChatDetails",
  async (_, thunkAPI) => {
    const { data, msg, success } = await createSelfChatAPI();
    console.log("Creating Group in Thunk Response:", { data, msg, success });
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
const modifyMembersAsync = createAsyncThunk(
  "chat/modifyMembersDetails",
  async (info, thunkAPI) => {
    const { data, msg, success } = await modifyMembersAPI(thunkAPI.getState().chat.chatId,info);
    console.log("Creating Group in Thunk Response:", { data, msg, success });
    if (!success) {
      return thunkAPI.rejectWithValue({ msg });
    }
    return {
      ...data,
      msg,
    };
  }
);
const modifyAdminsAsync = createAsyncThunk(
  "chat/modifyAdminsDetails",
  async (info, thunkAPI) => {
    console.log("hey Hello");
    
    const { data, msg, success } = await modifyAdminsAPI(
      thunkAPI.getState().chat.chatId,
      info
    );
    console.log("Creating Group in Thunk Response:", { data, msg, success });
    if (!success) {
      return thunkAPI.rejectWithValue({ msg });
    }
    return {
      ...data,
      msg,
    };
  }
);
const exitChatAsync = createAsyncThunk(
  "chat/exitChatDetails",
  async (info=null, thunkAPI) => {
    console.log("Starting exitChatAsync");

    const { data, msg, success } = await exitChatAPI(
      thunkAPI.getState().chat.chatId,
      info
    );
    console.log("exitChatAsync in Thunk Response:", { data, msg, success });
    if (!success) {
      return thunkAPI.rejectWithValue({ msg });
    }
    return {
      chatId: thunkAPI.getState().chat.chatId,
      msg,
      success:true,
    };
  }
);


// name , intialState reducers , extraReducers ......
export const chatSlice = createSlice({
  name: "chat",
  initialState,
  // exported as slice.actions .....
  reducers: {
    setSelectedChatId: (state, action) => {
      state.chatId = action.payload;
    },
    resetStatus: (state, action) => {
      state.status = action.payload;
    },
    resetChat : (state) =>{
      state.chatId= null;
      state.members=[];
      state.admins=[];
      state.chatType=null;
      state.chatName=null;
      state.chatProfilePic=null;
      state.status = "idle";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createChatAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createChatAsync.fulfilled, (state, action) => {
        console.log("createSelfChatAsync", action.payload);
        const {
          _id: chatId,
          members,
          groupAdmins,
          chatType,
          chatName,
          chatProfilePic,
          createdByUser,
        } = action.payload;
        state.chatId = chatId;
        state.members = members;
        state.admins = groupAdmins;
        state.chatType = chatType;
        state.chatName = chatName;
        state.createdByUser = createdByUser;
        state.chatProfilePic = chatProfilePic;
        state.status = "idle";
      })
      .addCase(createChatAsync.rejected, (state, action) => {
        state.status = "rejected";
        console.log("In Rejected State of createUserAsync", action);
        // resetChat();
      })
      .addCase(getChatAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getChatAsync.fulfilled, (state, action) => {
        console.log("createSelfChatAsync", action.payload);
        const {
          _id: chatId,
          members,
          groupAdmins,
          chatType,
          chatName,
          chatProfilePic,
          createdByUser,
        } = action.payload;
        state.chatId = chatId;
        state.members = members;
        state.admins = groupAdmins;
        state.chatType = chatType;
        state.chatName = chatName;
        state.createdByUser = createdByUser;
        state.chatProfilePic = chatProfilePic;
        state.status = "idle";
      })
      .addCase(getChatAsync.rejected, (state, action) => {
        state.status = "rejected";
        console.log("In Rejected State of createUserAsync", action);
        // resetChat();
      })
      .addCase(modifyMembersAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(modifyMembersAsync.fulfilled, (state, action) => {
        console.log("createSelfChatAsync", action.payload);
        const { members, groupAdmins } = action.payload;
        state.members = members;
        state.admins = groupAdmins;
        state.status = "idle";
      })
      .addCase(modifyMembersAsync.rejected, (state, action) => {
        state.status = "rejected";
        console.log("In Rejected State of createUserAsync", action);
        // resetChat();
      })
      .addCase(modifyAdminsAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(modifyAdminsAsync.fulfilled, (state, action) => {
        console.log("createSelfChatAsync", action.payload);
        const { groupAdmins } = action.payload;
        state.admins = groupAdmins;
        state.status = "idle";
      })
      .addCase(modifyAdminsAsync.rejected, (state, action) => {
        state.status = "rejected";
        console.log("In Rejected State of createUserAsync", action);
        resetChat();
      })
      .addCase(exitChatAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(exitChatAsync.fulfilled, (state, action) => {
        console.log("createSelfChatAsync", action.payload);
        // change SelectedChat = "";
        // delete from chats User 
        // messsage null
        // const { chatId } = action.payload;
      })
      .addCase(exitChatAsync.rejected, (state, action) => {
        state.status = "rejected";
        console.log("In Rejected State of createUserAsync", action);
        // resetChat();
      });
  },
});

// reducer**s** turn into actions ....
export const { setSelectedChatId, resetStatus, resetChat } = chatSlice.actions;

export {
  createChatAsync,
  createSelfChatAsync,
  getChatAsync,
  modifyAdminsAsync,
  modifyMembersAsync,
  exitChatAsync,
};

// import this reducer .......
export default chatSlice.reducer;
