const errorHandlerMiddleware = (err,req,res,next)=>{
    // console.error("Global Error:", err);

    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal Server Error";

    return res.status(statusCode).json({
      success: false,
      message,
      stack: err.stack // uncomment in dev for debugging
    });
}

module.exports = errorHandlerMiddleware;