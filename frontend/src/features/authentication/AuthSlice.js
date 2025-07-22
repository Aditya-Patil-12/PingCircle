import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  userId: null,
  userEmail: null,
  isEmailVerified:false,
  isLogin: false,
  serverMsg:"",
  status: "idle",
};

import {
  createUser,
  checkUser,
  socialCheckUser,
  verifyEmail,
  checkVerficationResult,
  resetPasswordUser,
  showMeUser,
  logoutUserAPI,
} from "./AuthAPI";


const createUserAsync = createAsyncThunk(
  "auth/createUserDetails",
  async (info,thunkAPI) => {
    console.log("Creating User in Thunk :", info);
    const {data,msg,success} = await createUser(info);
    // console.log("Creating User in Thunk Response:", response);
    if (!success) {
      // TODO : go for Register
      return thunkAPI.rejectWithValue({msg});
    }
    return {
      userEmail: data.email,
      userId: data._id,
      isEmailVerified:data.isEmailVerified,
      msg,
    };
  }
);

const checkUserAsync = createAsyncThunk(
  "auth/checkUserDetail",
  async (info,thunkAPI) => {
    console.log("Checking User in Thunk :", info);
    const {success,msg,data} = await checkUser(info);
    console.log("Checking User in Thunk Response:", { success, msg, data });
    if (!success) {
        // data -> action.payload
        return thunkAPI.rejectWithValue({msg});    
    }
    return {
      userEmail: data.email,
      userId: data._id,
      isEmailVerified: data.isEmailVerified,
      msg,
    };
  }
);

const socialCheckUserAsync = createAsyncThunk(
  "auth/socialUserDetail",
  async (info,thunkAPI) => {
    console.log("Checking socialUserDetail in Thunk :", info);
    const { success, msg, data } = await socialCheckUser(info);
    console.log("Checking User in Thunk Response:", { success, msg, data });
    if (!success) {
      // data -> action.payload
      return thunkAPI.rejectWithValue({ msg });
    }
    return {
      userEmail: data.email,
      userId: data._id,
      msg,
    };
  }
);

const startEmailVerificationOfUserAsync = createAsyncThunk(
  "auth/startEmailVerificationUserOfDetails",
  async (_,thunkAPI) => {
    console.log(thunkAPI.getState().auth);
    const resp = await verifyEmail(thunkAPI.getState().auth.userEmail);

    const { data, msg, success } = await resp;
    if (!success) {
      return thunkAPI.rejectWithValue({ msg, isEmailVerified: false });
    }
    return { ...data, msg };
  }
); 
const startResetPasswordOfUserAsync = createAsyncThunk(
  "auth/startResetPasswordOfDetails",
  async (info) => {
    const resp = await resetPasswordUser(info);
    const { data, msg, success } = await resp;
    if (!success) {
      return thunkAPI.rejectWithValue({ msg, isEmailVerified: false });
    }
    return { ...data, msg };
  }
); 

const checkVerificatonTokenFieldOfUserAsync = createAsyncThunk(
  "auth/checkVerificatonTokenFieldOfUserDetails",
  async (params, thunkAPI) => {
    const resp = await checkVerficationResult(params);

    const { data, msg, success } = await resp;
    if (!success) {
      return thunkAPI.rejectWithValue({ msg });
    }
    return { ...data, msg };
  }
); 
const showMeUserAsync = createAsyncThunk(
  "auth/showMeUserAsyncDetails",
  async (_,thunkAPI) => {
    console.log("Show Me User\n");
    // console.log(showMeUser);
    
    const resp = await showMeUser();

    console.log("Show Me User Server Response", resp);
    const { data, msg, success } = resp;
    if (!(success)) {
      return thunkAPI.rejectWithValue({ msg });
    }
    return  { ...data,msg ,success };
  }
); 
const logoutUserAsync = createAsyncThunk(
  "auth/loguoutUserDetails",async (_,thunkAPI) =>{
    const id = thunkAPI.getState().auth.userId;
    const resp = await logoutUserAPI(id);
    
    console.log("Show Me User Server Response", resp);
    const { data, msg, success } = resp;
    if (!(success)) {
      return thunkAPI.rejectWithValue({ msg });
    }
    return  { ...data,msg ,success };
})

// name , intialState reducers , extraReducers ......
export const authSlice = createSlice({
  name: "auth",
  initialState,
  // exported as slice.actions .....
  reducers: {
    clearAuthUser: (state) => {
      state.userId = null;
      state.userEmail = null;
      state.isLogin = false;
    },
    setIsLogin: (state, action) => {
      state.isLogin = action.payload;
    },
    resetStatus:(state,action) => {
        state.status = action.payload;
    },
    resetAuth: (state) =>{
        state.userEmail = null;
        state.userId = null;
        state.isEmailVerified = false;
        state.serverMsg = null;
        state.isLogin=false;
        state.status = "idle";
    }
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
      .addCase(checkUserAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(checkUserAsync.fulfilled, (state, action) => {
        console.log(
          "Updating userEmail and userId after checkUser",
          action.payload
        );
        const { userEmail, userId, msg, isEmailVerified } = action.payload;
        state.userEmail = userEmail;
        state.userId = userId;
        state.isEmailVerified = isEmailVerified;
        state.serverMsg = msg;
        state.isLogin = true;
        state.status = "idle";
      })
      .addCase(checkUserAsync.rejected, (state, action) => {
        state.status = "rejected";
        console.log("In Rejected State of checkUserAsync", action.payload);
        state.serverMsg = action.payload.msg;
        state.userEmail = null;
        state.userId = null;
      })
      .addCase(socialCheckUserAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(socialCheckUserAsync.fulfilled, (state, action) => {
        console.log(
          "Updating userEmail and userId after checkUser",
          action.payload
        );
        const { userEmail, userId, msg } = action.payload;
        state.userEmail = userEmail;
        state.userId = userId;
        state.serverMsg = msg;
        state.status = "idle";
      })
      .addCase(socialCheckUserAsync.rejected, (state, action) => {
        state.status = "rejected";
        console.log("In Rejected State of socialUserAsync", action.payload);
        state.serverMsg = action.payload.msg;
        state.userEmail = null;
        state.userId = null;
      })
      .addCase(startEmailVerificationOfUserAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(startEmailVerificationOfUserAsync.fulfilled, (state, action) => {
        console.log("inside thunk of startVerifying Email", action.payload);
        const { msg } = action.payload;
        state.serverMsg = msg;
        state.status = "idle";
      })
      .addCase(startEmailVerificationOfUserAsync.rejected, (state, action) => {
        state.status = "rejected";
        console.log(
          "In Rejected State of startEmailVerificationOfUserAsync",
          action.payload
        );
        state.serverMsg = action.payload.msg;
      })
      .addCase(checkVerificatonTokenFieldOfUserAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        checkVerificatonTokenFieldOfUserAsync.fulfilled,
        (state, action) => {
          console.log("Checking Verification Result for Field", action.payload);
          const { verify, msg } = action.payload;

          if (verify == "email") {
            state.isEmailVerified = true;
          }
          state.serverMsg = msg;

          state.status = "idle";
        }
      )
      .addCase(
        checkVerificatonTokenFieldOfUserAsync.rejected,
        (state, action) => {
          state.status = "rejected";
          console.log(
            "In Rejected State of checkVerificatonTokenFieldOfUserAsync",
            action.payload
          );
          state.serverMsg = action.payload.msg;
        }
      )
      .addCase(startResetPasswordOfUserAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(startResetPasswordOfUserAsync.fulfilled, (state, action) => {
        console.log("inside thunk of start Reseting Password", action.payload);
        const { msg } = action.payload;
        state.serverMsg = msg;
        state.status = "idle";
      })
      .addCase(startResetPasswordOfUserAsync.rejected, (state, action) => {
        state.status = "rejected";
        console.log(
          "In Rejected State of startResetPasswordOfUserAsync",
          action.payload
        );
        state.serverMsg = action.payload.msg;
      })
      .addCase(showMeUserAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(showMeUserAsync.fulfilled, (state, action) => {
        console.log("inside thunk of showMeUserAsync ", action.payload);
        const { _id, email, isEmailVerified, msg } = action.payload;

        state.serverMsg = msg;
        state.userId = _id;
        state.userEmail = email;
        state.isEmailVerified = isEmailVerified;
        // state.userNa
        state.status = "idle";
      })
      .addCase(showMeUserAsync.rejected, (state, action) => {
        state.status = "rejected";
        console.log("In Rejected State of showMeUserAsync", action.payload);
        state.serverMsg = action.payload.msg;
      })
      .addCase(logoutUserAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(logoutUserAsync.fulfilled, (state, action) => {
        console.log("inside thunk of logoutUserAsync ", action.payload);
        state.userId= null;
        state.userEmail= null;
        state.isEmailVerified=null;
        state.isLogin=null;
        state.serverMsg="";
      })
      .addCase(logoutUserAsync.rejected, (state, action) => {
        state.status = "rejected";
        console.log("In Rejected State of logoutUserAsync", action.payload);
        state.serverMsg = action.payload.msg;
      });
  },
});

// reducer**s** turn into actions ....
export const { clearAuthUser, setIsLogin, resetStatus, resetAuth } = authSlice.actions;

export {
  createUserAsync,
  checkUserAsync,
  socialCheckUserAsync,
  startEmailVerificationOfUserAsync,
  checkVerificatonTokenFieldOfUserAsync,
  startResetPasswordOfUserAsync,
  showMeUserAsync,
  logoutUserAsync,

};

// import this reducer .......
export default authSlice.reducer;
