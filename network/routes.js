const express = require('express');
const message = require('../components/message/network');

// al server le estamos pasando app
const routes = function (server) {
  server.use('/message', message)
}

module.exports = routes;