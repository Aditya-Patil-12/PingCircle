function checkForGroupMember(grpMembers, userId) {
  for (let member of grpMembers) {
    console.log(member, " ", userId);

    if (member.toString() == userId.toString()) {
      return true;
    }
  }
  return false;
}

module.exports = checkForGroupMember;