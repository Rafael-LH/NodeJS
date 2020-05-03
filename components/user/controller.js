const store = require('./store');

function addUser(name) {
  return new Promise((resolve, reject) => {
    if (name) {
      const myUser = {
        name: name,
        date: new Date(),
      }
      store.add(myUser);
      resolve(`Usuario registrado con exito!`);
    } else {
      console.log(`[UserController] no hay usuario`);
      reject('Los datos son incorrectos');
    }
  })
}

module.exports = {
  addUser,
}