const express = require('express');
const app = express();

const response = require('../../network/response');
const controller = require('./controller')

app.post('/', async (req, res) => {
  try {
    const { name } = req.body;
    const result = await controller.addUser(name);
    response.success(req, res, result, 201);
  } catch (error) {
    response.error(req, res, `${error}`, 500, error);
  }
})
app.get('/', async (req, res) => {
  try {
    const result = await controller.getUsers();
    response.success(req, res, result, 200);
  } catch (error) {
    response.error(req, res, 'Ha ocurrido algun error', 500, error)
  }
})
app.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params
    const result = await controller.deleteUser(id);
    response.success(req, res, result, 200);
  } catch (error) {
    response.error(req, res, 'Ha ocurrido algun error', error);
  }
})
app.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await controller.getUser(id);
    response.success(req, res, result, 200);
  } catch (error) {
    response.error(req, res, `Ha ocurrido algun error: ${error}`, 404, 'Not Found');
  }
})
app.patch('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    const result = await controller.updateUser(id, name);
    response.success(req, res, result, 200);
  } catch (error) {
    response.error(req, res, `Ha ocurrido algun error: ${error}`, 500);
  }
})
module.exports = app;