
import axios from "../../.config/axiosConfig";
const sliceURL = "chats";
const createChatAPI = async (info,isGroupChat) => {
  try {
    console.log("Create Chat in Chat API....", info);
    let resp =null;
    if( isGroupChat ){
      resp = await axios.post(`${sliceURL}/`,info);
    //   "isGroupChat":true,
    // "members":["68637e5cde6e2eb21a5d471a","68637da9df0cb1d6a12077db"],
    // "chatName":"First Group",
    // "chatProfilePic":"",
    // "groupType
    }
    else{
      resp = await axios.post(`${sliceURL}/`,info);
    }
    console.log("Server Response after Creating Chat in Chat API", resp);
    // TODO : check if validate exists
    if (!resp) {
      throw new Error("");
    }
    return { data: resp.data.data, msg: resp.data.message, success: true };
  } catch (error) {
    return { msg: error?.response?.data?.message, success: false };
  }
};
const createSelfChatAPI = async () => {
  try {
    console.log("createSelfChatAPI in Chat API....");
    let resp = await axios.get(`${sliceURL}/self`);
    console.log("Server Response after Creating Chat in Chat API", resp);
    // TODO : check if validate exists
    if (!resp) {
      throw new Error("");
    }
    return { data: resp.data.data, msg: resp.data.message, success: true };
  } catch (error) {
    return { msg: error?.response?.data?.message, success: false };
  }
};
const getChatAPI = async (id) =>{
    try {
      console.log("getChatAPI in Chat API....");
      let resp = await axios.get(`${sliceURL}/${id}`);
      console.log("Server Response after getChatAPI in Chat API", resp);
      // TODO : check if validate exists
      if (!resp) {
        throw new Error("");
      }
      return { data: resp.data.data, msg: resp.data.message, success: true };
    } catch (error) {
      return { msg: error?.response?.data?.message, success: false };
    }
}
const modifyMembersAPI = async (id,payload) => {
  try {
    console.log("modifyMembersAPI in Chat API....");
    let resp = await axios.post(`${sliceURL}/${id}/members`, payload);
    console.log("Server Response after modifyMembersAPI in Chat API", resp);
    // TODO : check if validate exists
    if (!resp) {
      throw new Error("");
    }
    return { data: resp.data.data, msg: resp.data.message, success: true };
  } catch (error) {
    return { msg: error?.response?.data?.message, success: false };
  }
};
const modifyAdminsAPI = async (id,payload) => {
  try {
    console.log("modifyAdminsAPI in Chat API....");
    let resp = await axios.post(`${sliceURL}/${id}/admins`, payload);
    console.log("Server Response after modifyAdminsAPI in Chat API", resp);
    // TODO : check if validate exists
    if (!resp) {
      throw new Error("");
    }
    return { data: resp.data.data, msg: resp.data.message, success: true };
  } catch (error) {
    return { msg: error?.response?.data?.message, success: false };
  }
};
const exitChatAPI = async (id,payload) => {
  try {
    console.log("modifyAdminsAPI in Chat API....");
    let resp = null;
    if(!payload){
      resp = await axios.delete(`${sliceURL}/${id}/exit`);
    }
    else{
      // superAdmin .......
      resp = await axios.delete(`${sliceURL}/${id}/exit`,{
        data: payload
      });
    }
    console.log("Server Response after modifyAdminsAPI in Chat API", resp);
    // TODO : check if validate exists
    if (!resp) {
      throw new Error("");
    }
    return { data: resp.data.data, msg: resp.data.message, success: true };
  } catch (error) {
    return { msg: error?.response?.data?.message, success: false };
  }
};


export {
  createChatAPI,
  createSelfChatAPI,
  getChatAPI,
  modifyMembersAPI,
  modifyAdminsAPI,
  exitChatAPI,
};
