const registerService = require('../services/RegisterService');
 
const validateRegister = async (req, res, next) => {
  const { email, name } = req.body;

  const findEmail = await registerService.findOne('email', email);

  const findName = await registerService.findOne('name', name);

  if (findEmail || findName) {
    return res.status(409).json({ message: 'Email ou nome já cadastrados' });
  }
  
  return next();
};

module.exports = validateRegister;