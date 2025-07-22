import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
    messages:[],
    status: "idle",
};

import {
    createMessageAPI,
    fetchChatMessageAPI,
} from "./MessageAPI";

const createMessageAsync = createAsyncThunk(
  "chat/createMessageDetails",
  async (info,thunkAPI) => {
    console.log("createMessageAsync in Thunk :", info);
    const { data, msg, success } = await createMessageAPI(info);
    console.log("createMessageAsync in Thunk Response:", {
      data,
      msg,
      success,
    });
    if (!success) {
      // TODO : go for Register
      return thunkAPI.rejectWithValue({ msg });
    }
    return data;
  }
);
const fetchChatMessageAsync = createAsyncThunk(
  "chat/fetchChatMessageDetails",
  async (id, thunkAPI) => {
    const { data, msg, success } = await fetchChatMessageAPI(id);
    console.log("fetchChatMessageAsync in Thunk Response:", {
      data,
      msg,
      success,
    });
    if (!success) {
      // TODO : go for Register
      return thunkAPI.rejectWithValue({ msg });
    }
    return data;
  }
);

export const messageSlice = createSlice({
  name: "message",
  initialState,
  // exported as slice.actions .....
  reducers: {
    addMessage:(state,action)=>{
        state.messages = [...state.messages,action.payload];
    },
    resetMessage : (state) =>{
      state.messages = [];
      state.status = "idle";
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchChatMessageAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchChatMessageAsync.fulfilled, (state, action) => {
        console.log("createSelfChatAsync", action.payload);
        state.messages=(action.payload) || [];
        state.status = "idle";
      })
      .addCase(fetchChatMessageAsync.rejected, (state, action) => {
        state.status = "rejected";
        console.log("In Rejected State of createUserAsync", action);
      })
      .addCase(createMessageAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createMessageAsync.fulfilled, (state, action) => {
        console.log("createSelfChatAsync", action.payload);
        state.messages.push(action.payload) || [];
        state.status = "idle";
      })
      .addCase(createMessageAsync.rejected, (state, action) => {
        state.status = "rejected";
        console.log("In Rejected State of createUserAsync", action);
      });
  },
});

// reducer**s** turn into actions ....
export const { addMessage, resetMessage } = messageSlice.actions;

export { createMessageAsync , fetchChatMessageAsync };

// import this reducer .......
export default messageSlice.reducer;

