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
    response.error(req, res, 'Ha ocurrido algun error', 500, error);
  }
})

module.exports = app;