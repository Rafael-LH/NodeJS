function addMessage(user, message) {
  return new Promise((resolve, reject) => {
    if (user, message) {
      const fullMessage = {
        user: user,
        message, message,
        data: new Date(),
      }
      resolve(fullMessage)
    } else {
      console.error('[MessageController] No hay usuario o mensaje');
      reject('Los datos son incorrectos');
    }
  })
}

module.exports = {
  addMessage
};