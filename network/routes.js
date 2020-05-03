const express = require('express');
const message = require('../components/message/network');
const user = require('../components/user/network');

// al server le estamos pasando app
const routes = function (server) {
  server.use('/message', message)
  server.use('/user', user)
}

module.exports = routes;