const express = require('express');
const LoginRouter = require('./LoginRouter');
const RegisterRouter = require('./RegisterRouter');

const router = express.Router();

router.use('/login', LoginRouter);

router.use('/register', RegisterRouter);

module.exports = router;