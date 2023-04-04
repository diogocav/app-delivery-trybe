const express = require('express');
const userController = require('../controllers/UserController');

const UserRouter = express.Router();

UserRouter.get('/seller', userController.getAllSellers);

module.exports = UserRouter;