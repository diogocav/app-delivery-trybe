const express = require('express');
const LoginRouter = require('./LoginRouter');
const RegisterRouter = require('./RegisterRouter');
const ProductsRouter = require('./ProductsRouter');
const SaleRouter = require('./SaleRouter');
const UserRouter = require('./UserRouter');

const router = express.Router();

router.use('/login', LoginRouter);

router.use('/register', RegisterRouter);

router.use('/products', ProductsRouter);

router.use('/orders', SaleRouter);

router.use('/sale', SaleRouter);

router.use('/users', UserRouter);

module.exports = router;