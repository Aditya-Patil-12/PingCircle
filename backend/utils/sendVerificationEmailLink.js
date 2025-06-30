const sendEmail = require('./sendEmail')
const crypto = require("crypto");
const createHash = require('./createHash');
const sendVerificationEmailLink  = async ({email,verify,user}) =>{
    const verificationToken = crypto.randomBytes(70).toString("hex");

    console.log("the unhashed Token is:::::", verificationToken);

    const origin = process.env.CORS_ORIGIN;
    let subject = "",message ="";

    if( verify == "email" ){
        subject = "Verify Email";
        message = `<h3>Please click on this link below to verify to Email</h3><a href =\"${origin}/auth/verifyField?verify=email&email=${email}&token=${verificationToken}\"> Verify Email</a>`;
    }
    else if( verify == "password" ){
        subject = "Reset Password Link";
        message = `<h3>Please click on this link below to Reset Password</h3><a href =\"${origin}/auth/verifyField?verify=password&email=${email}&token=${verificationToken}\">Click Here</a>`;
    }

    sendEmail({ email,message,subject});

    const tenMinutes = 1000 * 60 * 10;
    user.verificationToken = createHash(verificationToken);
    const verificationTokenExpirationDate = new Date(Date.now() + tenMinutes);
    user.verificationTokenExpirationDate = verificationTokenExpirationDate;

    console.log("This the hashed Token", user.verificationToken);
  
}

module.exports = sendVerificationEmailLink;