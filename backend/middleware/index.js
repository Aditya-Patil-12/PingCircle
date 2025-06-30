const errorHandlerMiddleware = require('./errorHandler');
const notFoundMiddleware = require('./notFound');

const upload = require('./multer');

const authenticateUser = require("./authentication")
module.exports = {
  errorHandlerMiddleware,
  notFoundMiddleware,
  
  authenticateUser,

  upload,
};