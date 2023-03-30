const express = require('express');
const productsController = require('../controllers/ProductsController');

const ProductsRouter = express.Router();

ProductsRouter.get('/', productsController.getAll);

module.exports = ProductsRouter;