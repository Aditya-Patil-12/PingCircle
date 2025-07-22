// import axios from 'axios'
import axios from '../../.config/axiosConfig'
const sliceURL = "auth/"
/*
In REST API design, endpoint naming should be resource-oriented and descriptive, not action-based. However, for authentication endpoints like login and register, action-oriented names are acceptable because they initiate a process rather than operate directly on a resource.
*/
const createUser = async (info) => {
  try {
    console.log("Create User in Auth API....", info);

    let resp = await axios.post(`${sliceURL + "register"}`, info, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    console.log("Server Response after Creating User in Auth API", resp);
    // TODO : check if validate exists
    if (!resp) {
      throw new Error("");
    }
    return { data: resp.data.data,msg:resp.data.message, success: true };
  } catch (error) {
    
    return { msg: error?.response?.data?.message, success: false };
  }
};

const checkUser = async (info) => {
  try {
    console.log("Check user for Login API", info);
    const resp = await axios.post(`${sliceURL + "login"}`,info);
    console.log(
      "Server Sent Response for Login :: see if it returns promise or not",
      resp
    );
    console.log("Server Sent Response for Login", await resp);
    return { data: resp.data.data, msg: resp.data.message, success: true };
  } catch (error) {
    return { msg: error.response.data.message, success: false };
  }
};

const socialCheckUser = async (info) => {
  try {
    console.log("Check user for Login API", info);
    const resp = await axios.post(`${sliceURL + "socialLogin/google"}`, info);
    console.log(
      "Server Sent Response for Login :: see if it returns promise or not",
      resp
    );
    console.log("Server Sent Response for Login", await resp);
    return { data: resp.data.data, msg: resp.data.message, success: true };
  } catch (error) {
    return { msg: error.response.data.message, success: false };
  }
};

const verifyEmail = async (info) =>{
  try {
    console.log("Starting Verify Email in Auth API ....", info);
    if( !info ) throw new Error('Please Login First\n');
    let resp = await axios.get(`${sliceURL}` + `verifyEmail/${info}`);
    console.log("Server Response after Starting to Verify User Email in Auth API", resp);
    // TODO : check if validate exists
    if (!resp) {
      throw new Error("");
    }
    return { data: resp.data.data, msg: resp.data.message, success: true };
  } catch (error) {
    return { msg: error?.response?.data?.message, success: false };
  }
} 
const checkVerficationResult = async (info) =>{
  // info everything ---> passes karna hai as query 
  const query = [];
  for(let key in info.query) query.push(`${key}=${info.query[key]}`);
  console.log(query.join("&"));
  
  try {
    console.log("Checking to Verify Email in Auth API ....", info);

    let resp = await axios.post(`${sliceURL}` + `verifyFieldToken?${query.join('&')}`,info.body);
    console.log("Server Response after Starting to Verify User Email in Auth API", resp);
    // TODO : check if validate exists
    if (!resp) {
      throw new Error("");
    }
    return {
      data: { ...resp.data.data, verify: resp["verify"] },
      msg: resp.data.message,
      success: true,
    };
  } catch (error) {
    console.log(error);
    
    return { msg: error?.response?.data?.message, success: false };
  }
} 
// Un protected API 
const resetPasswordUser = async (info) =>{
  try {
    console.log("Starting Reset Password in Auth API ....", info);
    let resp = await axios.get(`${sliceURL}` + `forgot-password/${info}`);
    console.log(
      "Server Response after Starting to Reset User Password in Auth API",
      resp
    );
    if (!resp) {
      throw new Error("");
    }
    return { data: resp.data.data, msg: resp.data.message, success: true };
  } catch (error) {
    return { msg: error?.response?.data?.message, success: false };
  }
}

const showMeUser = async () =>{
  try {
    console.log("Hey API");

    console.log("Starting Show Me User in Auth API ....", );
    console.log(`${sliceURL}` + `showMe`);
    
    let resp = await axios.get(`${sliceURL}` + `showMe`);
    console.log(
      "Server Response after Starting to Show Me in Auth API",
      resp
    );
    if (!resp) {
      throw new Error("");
    }
    return { data: resp.data.data, msg: resp.data.message, success: true };
  } catch (error) {
    return { msg: error?.response?.data?.message, success: false };
  }
}

const logoutUserAPI = async () =>{
  try {
    console.log("Hey API");

    console.log("Starting Show Me User in Auth API ....");
    // console.log(`${sliceURL}` + ``);

    let resp = await axios.get(`${sliceURL}` + `logout`);
    console.log("Server Response after Starting to Show Me in Auth API", resp);
    if (!resp) {
      throw new Error("");
    }
    return { data: resp.data.data, msg: resp.data.message, success: true };
  } catch (error) {
    return { msg: error?.response?.data?.message, success: false };
  }
}

export {
  createUser,
  checkUser,
  socialCheckUser,
  verifyEmail,
  checkVerficationResult,
  resetPasswordUser,
  showMeUser,
  logoutUserAPI,
};
