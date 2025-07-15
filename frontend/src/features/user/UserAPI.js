// import axios from 'axios'
import axios from "../../.config/axiosConfig";
const sliceURL = "user/";
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
    return { data: resp.data.data, msg: resp.data.message, success: true };
  } catch (error) {
    return { msg: error?.response?.data?.message, success: false };
  }
};


export {

};
