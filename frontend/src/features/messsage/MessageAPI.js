
import axios from "../../.config/axiosConfig";
const sliceURL = "messages";
const createMessageAPI = async (info,) => {
  try {
    console.log("Create Chat in Message API....", info);
    let resp =await axios.post(`${sliceURL}/${info.id}`,{content:info.content});
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
const fetchChatMessageAPI = async (info) => {
  try {
    console.log("Create Chat in Message API....", info);
    let resp = await axios.get(`${sliceURL}/${info}`);
    console.log("Server Response after Creating Chat in Message API", resp);
    // TODO : check if validate exists
    if (!resp) {
      throw new Error("");
    }
    return { data: resp.data.data, msg: resp.data.message, success: true };
  } catch (error) {
    return { msg: error?.response?.data?.message, success: false };
  }
};

export { createMessageAPI, fetchChatMessageAPI };
