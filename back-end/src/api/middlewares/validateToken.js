const jwt = require('jsonwebtoken');
require('dotenv/config');
const userService = require('../services/UserService');

const secret = process.env.JWT_SECRET || 'segredoSuperSecreto';

const tokenValidation = async (req, res, next) => {
    const token = req.header('Authorization');

    if (!token) {
      return res.status(401).json({ message: 'Token not found' });
    }

    try {
      const decoded = jwt.verify(token, secret);

      const user = await userService.findOne(decoded.data.email);

      if (!user) {
        return res.status(401).json({ message: 'Token must be a valid token' });
      }

      next();
    } catch (err) { return res.status(401).json({ message: 'Token must be a valid token' }); }
  };

module.exports = tokenValidation;