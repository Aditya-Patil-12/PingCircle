const mongoose = require("mongoose");
// final setup database setup ......
const connectDB = () => {
    return mongoose.connect(process.env.MONGO_URI);
};


module.exports = connectDB;

