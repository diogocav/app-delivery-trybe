const express = require('express');
const saleController = require('../controllers/SaleController');

const SaleRouter = express.Router();

SaleRouter.post('/', saleController.create);

module.exports = SaleRouter;