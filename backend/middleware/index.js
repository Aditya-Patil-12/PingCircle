const errorHandlerMiddleware = require('./errorHandler');
const notFoundMiddleware = require('./notFound');
const upload = require('./multer');
module.exports = {
  errorHandlerMiddleware,
  notFoundMiddleware,
  upload
};