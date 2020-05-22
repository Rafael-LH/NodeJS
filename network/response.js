const statusMessages = {
  '200': 'done',
  '201': 'created',
  '400': 'bad reques',
  '500': 'internal error'
}
exports.success = function (req, res, message, status) {
  const statusCode = status || 200;
  const statusMessage = message || statusMessages[statusCode];

  res.status(statusCode).send({
    error: '',
    body: statusMessage
  })
}
exports.error = function (req, res, message, status, details) {
  console.error(`[Response error] ${details}`);
  res.status(status || 500).send({
    error: message,
    body: {}
  })
}