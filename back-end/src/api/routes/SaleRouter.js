const express = require('express');
const saleController = require('../controllers/SaleController');
const tokenValidation = require('../middlewares/validateToken');

const SaleRouter = express.Router();

SaleRouter.post('/', tokenValidation, saleController.create);

SaleRouter.get('/:id', tokenValidation, saleController.getAllSalesById);

SaleRouter.get('/details/:id', tokenValidation, saleController.getSale);

SaleRouter.patch('/:id', tokenValidation, saleController.update);

module.exports = SaleRouter;