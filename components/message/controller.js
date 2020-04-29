const store = require('./store');

function addMessage(user, message) {
  return new Promise((resolve, reject) => {
    if (user, message) {
      const fullMessage = {
        user: user,
        message, message,
        data: new Date(),
      }
      store.add(fullMessage);
      resolve(fullMessage)
    } else {
      console.error('[MessageController] No hay usuario o mensaje');
      reject('Los datos son incorrectos');
    }
  })
}
function getMessages() {
  return new Promise((resolve, reject) => {
    resolve(store.list());
  })
}

module.exports = {
  addMessage,
  getMessages
};