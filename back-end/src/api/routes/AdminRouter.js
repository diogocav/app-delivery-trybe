const express = require('express');
const adminController = require('../controllers/AdminController');
const tokenValidation = require('../middlewares/validateToken');
const validateRegister = require('../middlewares/validateRegister');

const AdminRouter = express.Router();

AdminRouter.get('/users', adminController.getAllUsers);

AdminRouter.delete('/delete/:id', tokenValidation, adminController.deleteUser);

AdminRouter.post('/new_user', tokenValidation, validateRegister, adminController.newUser);

module.exports = AdminRouter;