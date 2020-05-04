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
async function getUser(id) {
  const user = await Model.findOne({
    _id: id
  })
  return user;
}
async function updateUser(id, name) {
  const user = await Model.findOne({
    _id: id
  })
  user.name = name;
  user.save();
  return user;
}
module.exports = {
  add: addUser,
  list: getUsers,
  get: getUser,
  delete: deleteUser,
  update: updateUser,
  issetUser: issetUser,
}