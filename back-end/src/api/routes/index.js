const express = require('express');
const LoginRouter = require('./LoginRouter');
const RegisterRouter = require('./RegisterRouter');
const ProductsRouter = require('./ProductsRouter');
const SaleRouter = require('./SaleRouter');

const router = express.Router();

router.use('/login', LoginRouter);

router.use('/register', RegisterRouter);

router.use('/products', ProductsRouter);

router.use('/orders', SaleRouter);

module.exports = router;