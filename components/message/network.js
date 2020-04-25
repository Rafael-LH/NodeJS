const express = require('express');
const app = express();

const response = require('../../network/response');
const controller = require('./controller')

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

app.post('/', async (req, res) => {

  try {
    const { user, message } = req.body;
    const result = await controller.addMessage(user, message);
    response.success(req, res, result, 201);
  } catch (error) {
    response.error(req, res, 'Información invalida ❌', 400, 'Bad Request')
  }
})

module.exports = app;