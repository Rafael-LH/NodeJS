const express = require('express');
const multer = require('multer'); // nos sirve para leer archivos que nos bienen por req y guardar en disco
const router = express.Router();

const response = require('../../network/response');
const controller = require('./controller')

const upload = multer({ // con esto creamos una instancia de nuestro archivo que nos guardara en uploads
  dest: 'public/files' // automaticamente el distimo parte de la raiz del proyecto es decir ./ 
})

router.get('/', async function (req, res) { //los dos parametros de una petición request y el response 

  try {
    const filterMessages = req.query.chat || null;
    const message = await controller.getMessages(filterMessages);
    const fullMessage = await message;
    response.success(req, res, fullMessage, 200);
  } catch (error) {
    response.error(req, res, 'Unexpected error', 500, error)
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

// para indicarle a multer de donde va a sacar el archivo lo hacemos de la siguiente manera llamamos nuestra instancia del archivo que en este 
// caso le pusimos upload despues llamamos al metodo single el cual resive un parametro que ese es el nombre campo que le 
// pusimos al archivo que en este caso desde la coleccion de postman le pusimos file en el form-data
router.post('/', upload.single('file'), async (req, res) => {
  try {
    const { user, message, chat } = req.body;
    // console.log(req.file);
    const result = await controller.addMessage(user, message, chat, req.file);
    response.success(req, res, result, 201);
  } catch (error) {
    response.error(req, res, 'Información invalida ❌', 400, 'Bad Request')
  }
})

router.patch('/:id', async (req, res) => { // actualiza parte de un registro y PUT actualiza toda la información
  try {
    const { id } = req.params
    const { message } = req.body

    const result = await controller.updateMessage(id, message);
    response.success(req, res, result, 200);
  } catch (error) {
    response.error(req, res, 'NO se pudo actualizar el registro. ❌', 400, 'Bad Request');
  }
})
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params
    const { message, status } = await controller.findMessage(id)
    response.success(req, res, message, status)

  } catch (error) {
    response.error(req, res, 'Mensaje no encontrado ⚠︎', 404, 'Not Found');
  }
})
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params
    const result = await controller.deleteMessage(id);
    response.success(req, res, result, 200);
  } catch (error) {
    response.error(req, res, 'Ha ocurrido algun error ☹️', 500, error);
  }
})
module.exports = router;