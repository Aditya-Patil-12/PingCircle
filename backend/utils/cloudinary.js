const {v2 : cloudinary} =require('cloudinary')
const fs = require('fs');
const path="";

// Return "https" URLs by setting secure: true
cloudinary.config({
    secure: true
});
  
// Log the configuration
// {
//   cloud_name: 'dvcj0krbo',
//   api_key: '154154926577789',
//   api_secret: 'EMBcp97hs9UXMIaEeDnpIy8GICI',
//   private_cdn: false,
//   secure_distribution: null,
//   secure: true
// }
console.log(cloudinary.config());

// cloudinary.config({
//   cloud_name: "my_cloud_name",
//   api_key: "my_key",
//   api_secret: "my_secret",
// });


const uploadOnCloudinary = async (localFilePath)=>{
    try {
        if( !localFilePath ) return null; 
        const resp = await cloudinary.uploader.upload(localFilePath,{
            resource_type:"auto",
        },)       
        console.log("resp.url");
        return resp;
    } catch (error) {
        console.log("Error Occured while uploading File on Cloudinary");
        fs.unlinkSync(localFilePath)
        return null;    
    }
}

const deleteFile = async (localFilePath)=>{
    fs.unlinkSync(localFilePath);
}

// uploads done 
module.exports = { uploadOnCloudinary, deleteFile };