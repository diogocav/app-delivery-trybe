const express = require('express');
const saleController = require('../controllers/SaleController');
const tokenValidation = require('../middlewares/validateToken');

const SaleRouter = express.Router();

SaleRouter.post('/', tokenValidation, saleController.create);

module.exports = SaleRouter;