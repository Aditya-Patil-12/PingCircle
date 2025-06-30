// const jwt = require("jsonwebtoken");
// const payload = {
//   name: "FOO",
// };
// let encoded = jwt.sign(payload, "shhhhh");

// let decoded = jwt.verify(encoded, "shh");
// console.log(encoded, " ", decoded);

// { name: 'FOO', iat: 1750513932 }

// const { token, email } = req.query;
require('dotenv').config()
const token = 1231243123;
const email = "aditypatil71@gmail.com"
const subject = "Verify Email";
const origin = process.env.CORS_ORIGIN;
const message = `
<h3>Please click on this link below to verify to Email</h3>
<a href =\"${origin}/verification?verify=email&email=${email}&token=${token}
> Verify Email</a> 
`;


console.log(message);
