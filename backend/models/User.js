const mongoose = require("mongoose");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const userSchema = new mongoose.Schema(
  {
    userName: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, trim: true },
    phoneNo: { type: String, required: true },
    password: { type: String, required: true },
    isEmailVerified: { type: Boolean, default: false },
    profilePic: {
      type: String,
      default:
        "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
    },
    socialLoginType: {
      type: String,
      enum:["custom","google"],
      default: "custom",
    },
    verificationToken: {
      type: String,
      default: null,
    },
    verificationTokenExpirationDate: {
      type: Date,
      default: null,
    },
  },
  { timestamps: true }
);
// middleware .....
// Never give callback because it does have it's inherits this
// always use function
userSchema.pre('save',async function (next){
  // this.isModified(field which you is modified in string )
  if( this.isModified('password') ) {
    this.password = await bcrypt.hash(this.password,11);
  }
  return next();
})

// Methods on Scehma ====================================================================
// even if we await here we need to write await functionCall()
userSchema.methods.isPasswordCorrect = async function (password){
  try {
    console.log(this.password," ",password);
    
    return await bcrypt.compare(password,this.password);
    
  } catch (error) {
    console.log(error);
  }

}

const User = mongoose.model("User", userSchema);

module.exports = User;
