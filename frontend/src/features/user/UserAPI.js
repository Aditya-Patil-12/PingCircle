// import axios from 'axios'
import axios from "../../.config/axiosConfig";
const sliceURL = "users";
const searchUsers = async (userName) => {
  try {
    console.log("searchUsers in Users API....", userName);
    let resp = await axios.get(`${sliceURL}?search=${userName}`);
    console.log("Server Response after Creating User in Auth API", resp);
    // TODO : check if validate exists
    if (!resp) {
      throw new Error("");
    }
    return { data: resp.data.data, msg: resp.data.message, success: true };
  } catch (error) {
    return { msg: error?.response?.data?.message, success: false };
  }
};
const showCurrentUser = async () => {
  try {
    console.log("showCurrentUser in User API....");

    let resp = await axios.get(`${sliceURL}/showMe`);
    console.log("Server Response after showCurrentUser in User API", resp);
    // TODO : check if validate exists
    if (!resp) {
      throw new Error("");
    }
    return { data: resp.data.data, msg: resp.data.message, success: true };
  } catch (error) {
    return { msg: error?.response?.data?.message, success: false };
  }
};

const temp = async (userName) =>{
  console.log("Hereh ::", userName);
  console.log("ok :::  ", userName, `${sliceURL}?search=A`);
  const resp = await axios.get(`${sliceURL}?search=${userName}`);
  console.log("Server Response after Searching User in User API", resp);
      // TODO : check if validate exists
      if (!resp) {
        throw new Error("");
      }
      return { data: resp.data.data, msg: resp.data.message, success: true };
}
export { searchUsers, showCurrentUser, temp };
