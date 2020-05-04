const Model = require('./model');

function addUser(user) {
  const myUser = new Model(user);
  myUser.save();
}
async function issetUser(name) {
  const isset = await Model.find({
    name: name
  })
  return isset
}
async function getUsers() {
  const users = await Model.find();
  return users;
}
async function deleteUser(id) {
  await Model.deleteOne({
    _id: id
  })
  return `Usuario eliminado!`
}
module.exports = {
  add: addUser,
  list: getUsers,
  // get,
  delete: deleteUser,
  // update,
  issetUser: issetUser,
}