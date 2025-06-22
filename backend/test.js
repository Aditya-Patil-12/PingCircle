const jwt = require("jsonwebtoken");
const payload  = {
    "name":"FOO"
};
let encoded = jwt.sign(payload, "shhhhh");


let decoded = jwt.verify(encoded, "shh");
console.log(encoded," ",decoded);

// { name: 'FOO', iat: 1750513932 }
