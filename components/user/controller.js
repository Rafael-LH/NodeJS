const store = require('./store');

function addUser(name) {
  return new Promise(async (resolve, reject) => {
    if (name) {
      const isset = await store.issetUser(name);
      if (isset.length > 0) {
        reject('El usuario que quieres ingresar ya existe en la base de datos.');
      } else {
        const myUser = {
          name: name,
          date: new Date(),
        }
        store.add(myUser);
        resolve(`Usuario registrado con exito!`);
      }
    } else {
      console.log(`[UserController] no hay usuario`);
      reject('Los datos son incorrectos');
    }
  })
}
function getUsers() {
  return new Promise((resolve, reject) => {
    const users = store.list();
    resolve(users);
  })
}
function deleteUser(id) {
  return new Promise((resolve, reject) => {
    if (id) {
      const user = store.delete(id);
      resolve(user)
    } else {
      reject('No puedes dejar valores nulos.')
    }

  })
}
module.exports = {
  addUser,
  getUsers,
  deleteUser,
}