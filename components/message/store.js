const Model = require('./model');

function addMessage(message) {
  // de la siguiente manera es como inserto datos en mongoose, llamo a mi modelo y le paso el message que me llega
  const myMessage = new Model(message); // recibe un objeto con todos los valores para insertar en nuestra coleccion de mongoDB
  myMessage.save(); // para finalizar la accion llamamos a su metodo save
}
function getMessages(filterMessages) {
  return new Promise((resolve, reject) => {
    let filter = {}
    if (filterMessages !== null) {
      filter = { user: filterMessages }
    }
    // Model.find() de esta manera nos traemos todos los datos que esten en nuestra tabla messages. Tiene que ser de forma asincrona
    // Model.find({user: "Edgar"}) podemos filtar los registros de esta manera
    Model.find(filter)
      .populate('user') // populamos el user porque estoy haciendo una relacion de mis users con mis messages
      .exec((error, populate) => {  // y para ejecutar el populado lo hacemos con exec
        if (!error) { //sea a distinto a error
          resolve(populate); // lo que hacemos es regresar la informacion popupada en caso de que no haya errores
        } else {
          reject(error);
        }
      });
  })
}
async function updateMessage(id, message) {
  // buscamos nuestro registro en nuestra store
  const foundMessage = await Model.findOne({
    _id: id
  })
  foundMessage.message = message // actualizamos el message que esta en nuestra store por el nuevo que nos llega
  const newMessage = await foundMessage.save(); // guardamos
  return newMessage;
}
async function findMessage(id) {
  const result = await Model.findOne({
    _id: id
  })
  const message = await result;
  return message
}
const deleteMessage = async id => {
  await Model.deleteOne({
    _id: id
  })
  return `Mensaje Eliminado!`;
}
module.exports = {
  add: addMessage,
  list: getMessages,
  get: findMessage,
  update: updateMessage,
  delete: deleteMessage,
}