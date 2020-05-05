const Model = require('./model');

function addChat(chat) {
  const myChat = new Model(chat);
  myChat.save();
}
function listChats() {
  return new Promise((resolve, reject) => {
    Model.find()
      .populate('users')
      .exec((error, dataPopulate) => {
        if (!error) {
          resolve(dataPopulate);
        } else {
          reject(`Ha ocurrido un error ${error}`);
        }
      })
  })
}
module.exports = {
  add: addChat,
  list: listChats,
}