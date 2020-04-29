const express = require('express') //Esta es la forma nativa que tiene node de traerse modulos
// import express from 'express' //de esta manera tambien podremos traer nuestra dependencia es la manera en que se hace con ecma6
const bodyParser = require('body-parser') //Esta dependencia nos sirve para poder acceder a la información del request que nos esta llegando
const path = require('path');
const PORT = 3000;
const app = express();

app.use(bodyParser.json()); //Le indicamos que lo queremos usar en forma de json

const files = path.join(__dirname, './public');
app.use(express.static(files)); // OR
// Name project    Name static files html / css / images 
// app.use('/NodeJS', express.static('./public')) 

app.get('/', (req, res) => {
  res.sendFile('index.html', { root: 'public' })
})

// const router = require('./components/message/network')
const router = require('./network/routes');
router(app);

// le paso mis rutas a app 
app.use(router);

// Para que nuestra aplicación este escuchando las rutas lo hacemos con lo siguiente
app.listen(PORT);
console.log(`La aplicación esta escuchando en  http://localhost:${PORT}`);
