const store = require('./store');
const responseMessage = {
  notFound: 'Mensaje no encontrado!'
}
function addMessage(user, message, chat, file) {
  return new Promise((resolve, reject) => {
    if (user, message, chat) {

      let fileUrl = '';
      if (file) {
        // files: es mi carpeta donde estara mi archivo estatico
        // http://localhost:3000 automaticamnete apunta a mi carpeta de public entoces accedo a files y descarga el archivo en automatico
        fileUrl = `http://localhost:3000/files/${file.filename}`
      }
      const fullMessage = {
        chat: chat, // chat is id user
        user: user,
        message, message,
        file: fileUrl,
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
      reject(`${responseMessage.notFound}`)
    }
  })
}

function findMessage(id) {
  return new Promise(async (resolve, reject) => {
    if (id) {
      const message = await store.get(id);
      if (!message) resolve({ message: `Mensaje no encontrado ⚠︎`, status: 404 });
      resolve({ message: message, status: 200 });

    } else {
      console.log(`[MessageController] No hay mensaje`);
      reject(`${responseMessage.notFound}`)
    }
  })
}
function deleteMessage(id) {
  return new Promise(async (resolve, reject) => {
    if (id) {
      const result = await store.delete(id);
      resolve(result);
    }
    console.log(`[MessageController] No hay id`);
    reject(`${responseMessage.notFound}`);
  })
}
module.exports = {
  addMessage,
  getMessages,
  updateMessage,
  findMessage,
  deleteMessage,
};