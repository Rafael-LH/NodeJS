const { uri, database } = require('../../config/')
const db = require('mongoose');
const Model = require('./model');

db.Promise = global.Promise; // de esta manera utilizamos la forma nativa de node de hacer promesas
db.connect(uri, {
  useUnifiedTopology: true,
  useNewUrlParser: true, // esta es una configuracion para que no haya problemas de compatibilidad en caso de que el servidor sea más nuevo o mas viejito
  dbName: database,
})
  .then((_) => console.log(`[db] Conectada con éxito!`))
  .catch(err => console.log(`[db] Ha ocurrido algun error ${err.message}`));

function addMessage(message) {
  // de la siguiente manera es como inserto datos en mongoose, llamo a mi modelo y le paso el message que me llega
  const myMessage = new Model(message); // recibe un objeto con todos los valores para insertar en nuestra coleccion de mongoDB
  myMessage.save(); // para finalizar la accion llamamos a su metodo save
}
async function getMessages(filterMessages) {
  let filter = {}
  if (filterMessages !== null) {
    filter = { user: filterMessages }
  }
  // Model.find() de esta manera nos traemos todos los datos que esten en nuestra tabla messages. Tiene que ser de forma asincrona
  // Model.find({user: "Edgar"}) podemos filtar los registros de esta manera
  const messages = await Model.find(filter);
  return messages;
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

module.exports = {
  add: addMessage,
  list: getMessages,
  get: findMessage,
  update: updateMessage,
  //delete,
}