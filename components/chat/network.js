const express = require('express');
const app = express();

const response = require('../../network/response');
const controller = require('./controller')

app.post('/', async (req, res) => {
  try {
    const { users } = req.body;
    const result = await controller.addChat(users);
    response.success(req, res, result, 201);
  } catch (error) {
    response.error(req, res, `Ha ocurrido algun error interno`, 500, error);
  }
});
app.get('/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const result = await controller.listChats(userId);
    response.success(req, res, result, 200);
  } catch (error) {
    response.error(req, res, error, 500);
  }
})
module.exports = app;