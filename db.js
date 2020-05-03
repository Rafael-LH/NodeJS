const { uri, database } = require('./config/')
const db = require('mongoose');

db.Promise = global.Promise; // de esta manera utilizamos la forma nativa de node de hacer promesas
function connect() {
  db.connect(uri, {
    useUnifiedTopology: true,
    useNewUrlParser: true, // esta es una configuracion para que no haya problemas de compatibilidad en caso de que el servidor sea más nuevo o mas viejito
    dbName: database,
  })
    .then((_) => console.log(`[db] Conectada con éxito!`))
    .catch(err => console.log(`[db] Ha ocurrido algun error ${err.message}`));
}
module.exports = connect