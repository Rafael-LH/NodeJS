const express = require('express');
const router = express.Router();

const response = require('../../network/response');
const controller = require('./controller')

router.post('/', async (req, res) => {
  try {
    const { name } = req.body;
    const result = await controller.addUser(name);
    response.success(req, res, result, 201);
  } catch (error) {
    response.error(req, res, `${error}`, 500, error);
  }
})
router.get('/', async (req, res) => {
  try {
    const result = await controller.getUsers();
    response.success(req, res, result, 200);
  } catch (error) {
    response.error(req, res, 'Ha ocurrido algun error', 500, error)
  }
})
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params
    const result = await controller.deleteUser(id);
    response.success(req, res, result, 200);
  } catch (error) {
    response.error(req, res, 'Ha ocurrido algun error', error);
  }
})
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await controller.getUser(id);
    response.success(req, res, result, 200);
  } catch (error) {
    response.error(req, res, `Ha ocurrido algun error: ${error}`, 404, 'Not Found');
  }
})
router.patch('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    const result = await controller.updateUser(id, name);
    response.success(req, res, result, 200);
  } catch (error) {
    response.error(req, res, `Ha ocurrido algun error: ${error}`, 500);
  }
})
module.exports = router;