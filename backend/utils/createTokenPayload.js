function createTokenPayload (user){
    console.log(user);
    
    return {email:user.email,name:user.userName,_id:user._id};
}
module.exports = createTokenPayload;