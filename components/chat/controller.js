const store = require('./store');

async function addChat(users) {
  return new Promise((resolve, reject) => {
    if (users, Array.isArray(users)) {
      const chat = {
        users: users,
        date: new Date(),
      }
      store.add(chat);
      resolve(chat);
    } else {
      reject(`Los datos son incorrectos`);
    }
  })
}
const listChats = (userId) => {
  return new Promise(async (resolve, reject) => {
    const chats = await store.list(userId);
    resolve(chats);
  })
}
module.exports = {
  addChat,
  listChats,
}