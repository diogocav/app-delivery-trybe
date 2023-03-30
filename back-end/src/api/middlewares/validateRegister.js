const registerService = require('../services/RegisterService');
 
const validateRegister = async (req, res, next) => {
  const { email, name } = req.body;

  const findEmail = await registerService.register(email);

  const findName = await registerService.register(name);

  if (findEmail || findName) {
    return res.status(409).json({ message: 'Email ou nome já cadastrados' });
  }
  
  return next();
};

module.exports = validateRegister;