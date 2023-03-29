const crypto = require('crypto');
const registerService = require('../services/RegisterService');

const register = async (req, res) => {
  const { name, email, password } = req.body;

  const passwordHash = crypto.createHash('md5').update(password).digest('hex');

  await registerService.register(name, email, passwordHash);

  return res.status(201).json('Created');
};

module.exports = {
  register,
};
