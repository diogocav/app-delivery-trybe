const express = require('express');
const loginController = require('../controllers/LoginController');
const validateLogin = require('../middlewares/loginValidation');
// const ValidateToken = require('../middleware/validateToken');

const LoginRouter = express.Router();

LoginRouter.post('/', validateLogin, loginController.login);

export default LoginRouter;