const notFoundMiddleware = (req, res) => {

  const statusCode = 400;
  const message = "No Such Service Is Provided";

  return res.status(statusCode).json({
    success: false,
    message,
  });
};

module.exports = notFoundMiddleware;
