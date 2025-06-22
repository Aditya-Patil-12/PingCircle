const multer = require("multer");
// send the file and both the json using form data
//  TODO :why multer is  better than 
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    console.log("Here is the file",file);
    // the req.body is not populated right ......
    // i think that the order in which the fields are given to the server they are processed ....
    console.log("Here is the req.body",req.body);
    cb(null, "./public/uploads");
  },
  filename: function (req, file, cb) {
    // Multer will not append any file extension for you, your function should return a filename complete with a file extension.
    // cb(null, `${Date.now()}-${file.originalname}`);
    cb(null, `Testing`);
  },
});

const upload = multer({ storage });
module.exports = upload;