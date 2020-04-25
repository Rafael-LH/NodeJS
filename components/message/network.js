const express = require('express');
const app = express();

const response = require('../../network/response');

app.get('/', (req, res) => {
  res.sendFile('index.html', { root: 'public' })
})
// de esta manera nuestra aplicación de express respondera a la url / y nos retornara un 'Hola' 
app.get('/', function (req, res) { //los dos parametros de una petición request y el response 

  // http://localhost:3000/user?orderBy=id

  const { status, message } = req.body
  const query = req.query
  const header = req.headers

  console.log(`Status: ${status}\nInfo ${message}`);
  console.log(query);

  //Tambien podemos mandar header en la respuesta
  res.header({
    "Custo-header": "Nuestro valor personalizado"
  });
  console.log(header);
  // response.send(header); //enviamos el mensaje
  response.success(req, res, 'Todo ha salido bien');

})

app.post('/', (req, res) => {
  if (req.query.error == 'ok') {
    response.error(req, res, 'Ha ocurrido algun error ❌', 500, 'Error de conexion')
  } else {
    response.success(req, res, 'Mensaje creado satisfactoriamente!', 201)
  }
})

module.exports = app;