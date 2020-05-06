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
      filter = { chat: filterMessages }
    }
    // Model.find() de esta manera nos traemos todos los datos que esten en nuestra tabla messages. Tiene que ser de forma asincrona
    // Model.find({user: "Edgar"}) podemos filtar los registros de esta manera
    Model.find(filter)
      .populate('user') // populate lo que hace es decir si esto es una referencia a otro objeto dentro de nuestra base de datos
      // buscala he inserta aqui toda la informacion
      // en mi campo user de messages estoy guardando el id del usuario entonces para hacer la busqueda con populate y insertarla 
      // en la respues de todos los mensajes lo que hacemos es que nos traemos uno de los tipos de mongo db el cual lo hacemos en
      // model.js con nuestro Schema nos traemos nuestro ObjectId el cual hara referencia a nuestra coleccion de users
      // entonces de esta manera es como populate busca los registros que coincidan con el id que estamos insertando en user
      .exec((error, dataPopulated) => {  // y para ejecutar el populado lo hacemos con exec
        if (!error) { //sea a distinto a error
          resolve(dataPopulated); // lo que hacemos es regresar la informacion popupada en caso de que no haya errores
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
  return new Promise((resolve, reject) => {
    Model.findOne({
      chat: id
    })
      .populate('user')
      .exec((error, dataPopulated) => {
        if (!error) {
          resolve(dataPopulated);
        } else {
          reject(error);
        }
      })
  })
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