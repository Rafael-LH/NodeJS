const message = require('../components/message/network')

// ha server le estamos pasando app
const routes = function (server) {
  server.use('/message', message)
}

module.exports = routes;