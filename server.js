const express = require('express') //Esta es la forma nativa que tiene node de traerse modulos
// import express from 'express' //de esta manera tambien podremos traer nuestra dependencia es la manera en que se hace con ecma6
const app = express();
// el modulo de http es un modulo interno de node por lo tanto no lo instalamos con npm
const server = require('http').Server(app);

// const cors = require('cors');
const bodyParser = require('body-parser') //Esta dependencia nos sirve para poder acceder a la información del request que nos esta llegando
const socket = require('./socket');
const path = require('path');
const PORT = 3000;

const db = require('./db')
db(); // conexion a la base de datos

// app.use(cors);

// connect socket
socket.connect(server);

// emit socket 
// socket.socket.io.on('connect', socket => {
//   console.log('Nuevo cliente conectado');
//   socket.emit('message', 'Welcome');
// })

//app.use(express.urlencoded({extended: true}))
//app.use(express.json()) 

app.use(bodyParser.json()); //esta configuracion nos sirve para que nuestro servidor entienda los datos que llegan de un formulario
app.use(bodyParser.urlencoded({ extended: false })) // y esta otra configuracion nos sirve para que nuestro servidor tambien entienda
//  los datos en formato json() y para poder enviar emails con tecnologias SPA como ReactJS
const files = path.join(__dirname, './public');
app.use(express.static(files)); // OR
// Name project    Name static files html / css / images 
// app.use('/NodeJS', express.static('./public')) 

app.get('/', (req, res) => {
  res.sendFile('index.html', { root: 'public' })
})

const router = require('./network/routes');
router(app);

// Para que nuestra aplicación este escuchando las rutas lo hacemos con lo siguiente
server.listen(PORT, function () {
  console.log(`La aplicación esta escuchando en  http://localhost:${PORT}`);
});