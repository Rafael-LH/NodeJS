const express = require('express');
const app = express();

const response = require('../../network/response');
const controller = require('./controller')

app.get('/', async function (req, res) { //los dos parametros de una petición request y el response 

  try {
    const message = await controller.getMessages();
    const fullMessage = await message;
    response.success(req, res, fullMessage, 200);
  } catch (error) {
    response.error(req, res, 'Unexpected error', 500, e)
  }
  // http://localhost:3000/user?orderBy=id
  // const { status, message } = req.body
  // const query = req.query
  // const header = req.headers
  //Tambien podemos mandar header en la respuesta
  // res.header({
  //   "Custo-header": "Nuestro valor personalizado"
  // });

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

app.patch('/:id', async (req, res) => { // actualiza parte de un registro y PUT actualiza toda la información
  try {
    const { id } = req.params
    const { message } = req.body

    const result = await controller.updateMessage(id, message);
    response.success(req, res, result, 200);
  } catch (error) {
    response.error(req, res, 'NO se pudo actualizar el registro. ❌', 400, 'Bad Request');
  }
})
app.get('/:id', async (req, res) => {
  try {
    const { id } = req.params

    const result = await controller.findMessage(id)
    response.success(req, res, result, 200)
  } catch (error) {
    response.error(req, res, 'Mensaje no encontrado ⚠︎', 404, 'Not Found');
  }
})
module.exports = app;