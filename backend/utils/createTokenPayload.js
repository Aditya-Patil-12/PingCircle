function createTokenPayload (user){
    console.log("Creating Token Payload",user);
    
    return {email:user.email,name:user.userName,userId:user._id};
}
module.exports = createTokenPayload;