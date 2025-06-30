const mongoose = require("mongoose");

const tokenSchema = new mongoose.Schema({
  ip: { type: String, required: true },
  userAgent: { type: String, required: true },
  refreshToken: { type: String, required: true },
  isValid:{type:String,default:true},
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref:"User",
    required:true,
  },
},{timestamps:true,});

const Token = mongoose.model("Token", tokenSchema);

module.exports = Token;