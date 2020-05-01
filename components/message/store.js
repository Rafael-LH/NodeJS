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
  const myMessage = new Model(message);
  myMessage.save();
}
async function getMessage() {
  const messages = await Model.find(); // de esta manera nos traemos todos los datos que esten en nuestra tabla messages. Tiene que ser de forma asincrona
  return messages;
}

module.exports = {
  add: addMessage,
  list: getMessage,
  // get,
  //update,
  //delete,
}