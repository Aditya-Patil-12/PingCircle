function checkForGroupAdmin (grpAdmins,userId) {
    for (let member of grpAdmins) {
      console.log(member," ",userId);
      
      if (member.toString() == userId.toString()) {
        return true;
      }
    }
    return false;
}

module.exports = checkForGroupAdmin;