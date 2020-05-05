const store = require('./store');

async function addChat(users) {
  return new Promise((resolve, reject) => {
    if (users) {
      const chat = {
        users: users,
        date: new Date(),
      }
      store.add(chat);
      resolve(chat);
    } else {
      reject(`Los datos son incorrectos`)
    }
  })
}
const listChats = () => {
  return new Promise(async (resolve, reject) => {
    const chats = await store.list();
    resolve(chats);
  })
}
module.exports = {
  addChat,
  listChats,
}