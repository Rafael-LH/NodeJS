const store = require('./store');

function addMessage(user, message) {
  return new Promise((resolve, reject) => {
    if (user, message) {
      const fullMessage = {
        user: user,
        message, message,
        date: new Date(),
      }
      store.add(fullMessage);
      resolve(fullMessage)
    } else {
      console.error('[MessageController] No hay usuario o mensaje');
      reject('Los datos son incorrectos');
    }
  })
}
function getMessages(filterMessages) {
  return new Promise((resolve, reject) => {
    resolve(store.list(filterMessages));
  })
}
function updateMessage(id, message) {
  return new Promise(async (resolve, reject) => {
    if (id && message) {
      const result = await store.update(id, message);
      resolve(result);
    } else {
      console.log(`[MessageController] No hay id o mensaje`);
      reject(`Mensaje no encontrado`)
    }
  })
}

function findMessage(id) {
  return new Promise(async (resolve, reject) => {
    if (id) {
      const message = await store.get(id);
      resolve(message);
    } else {
      console.log(`[MessageController] No hay mensaje`);
      reject(`Mensaje no encontrado`)
    }
  })
}
module.exports = {
  addMessage,
  getMessages,
  updateMessage,
  findMessage,
};