const express = require('express') //Esta es la forma nativa que tiene node de traerse modulos
// import express from 'express' //de esta manera tambien podremos traer nuestra dependencia es la manera en que se hace con ecma6
const bodyParser = require('body-parser') //Esta dependencia nos sirve para poder acceder a la información del request que nos esta llegando
const path = require('path');
const PORT = 3000;
const app = express();

const response = require('./network/response');

app.use(bodyParser.json()); //Le indicamos que lo queremos usar en forma de json

const files = path.join(__dirname, './public');
app.use(express.static(files)); // OR
// Name project    Name static files html / css / images 
// app.use('/NodeJS', express.static('./public')) 

app.get('/', (req, res) => {
  res.sendFile('index.html', { root: 'public' })
})
// de esta manera nuestra aplicación de express respondera a la url / y nos retornara un 'Hola' 
app.get('/user', function (req, res) { //los dos parametros de una petición request y el response 

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

app.post('/message', (req, res) => {
  if (req.query.error == 'ok') {
    response.error(req, res, 'Ha ocurrido algun error ❌', 500, 'Error de conexion')
  } else {
    response.success(req, res, 'Mensaje creado satisfactoriamente!', 201)
  }
})

// Para que nuestra aplicación este escuchando las rutas lo hacemos con lo siguiente
app.listen(PORT);
console.log(`La aplicación esta escuchando en  http://localhost:${PORT}`);
