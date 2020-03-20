const express = require('express') //Esta es la forma nativa que tiene node de traerse modulos
// import express from 'express' //de esta manera tambien podremos traer nuestra dependencia es la manera en que se hace con ecma6
const PORT = 3000;
const app = express();

// de esta manera nuestra aplicación de express respondera a la url / y nos retornara un 'Hola' 
app.use('/', function(request, response){ //los dos parametros de una petición request y el response 
 response.send('Hola'); //enviamos el mensaje
})

// Para que nuestra aplicación este escuchando las rutas lo hacemos con lo siguiente
app.listen(PORT);
console.log(`La aplicación esta escuchando en  http://localhost:${PORT}`);
