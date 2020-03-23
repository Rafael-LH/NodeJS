const express = require('express') //Esta es la forma nativa que tiene node de traerse modulos
// import express from 'express' //de esta manera tambien podremos traer nuestra dependencia es la manera en que se hace con ecma6
const bodyParser = require('body-parser') //Esta dependencia nos sirve para poder acceder a la información del request que nos esta llegando

const PORT = 3000;
const app = express();

app.use(bodyParser.json()); //Le indicamos que lo queremos usar en forma de json

// de esta manera nuestra aplicación de express respondera a la url / y nos retornara un 'Hola' 
app.get('/user', function(request, response){ //los dos parametros de una petición request y el response 
 
 const { message } = request.body
 const query = request.query
 const header = request.headers

 //Tambien podemos mandar header en la respuesta
 response.header({
  "Custo-header": "Nuestro valor personalizado"
 });
 
 response.send(header); //enviamos el mensaje

})

// Para que nuestra aplicación este escuchando las rutas lo hacemos con lo siguiente
app.listen(PORT);
console.log(`La aplicación esta escuchando en  http://localhost:${PORT}`);
