const {addAChatToUser} = require('../controller/userController')
async function notifyChatToUser(chatInfo, members) {
  for (let member of members) {
    await addAChatToUser(member, chatInfo);
  }
  return;
}

module.exports = {
  notifyChatToUser,
};