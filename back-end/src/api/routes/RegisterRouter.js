const express = require('express');
const registerController = require('../controllers/RegisterController');
const { validateLogin } = require('../middlewares/loginValidation');
const validateRegister = require('../middlewares/validateRegister');

const RegisterRouter = express.Router();

RegisterRouter.post('/', validateLogin, validateRegister, registerController.register);

module.exports = RegisterRouter;