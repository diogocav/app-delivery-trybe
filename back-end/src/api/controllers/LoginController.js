const crypto = require('crypto');
const GenerateNewToken = require('../middlewares/generateToken');
const loginService = require('../services/LoginService');

const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await loginService.loginCheck(email);

  if (!user) { return res.status(404).json({ message: 'Invalid email' }); }

  const hash = crypto.createHash('md5').update(password).digest('hex');
  const checkPassword = user.password === hash;
  
  if (!checkPassword) return res.status(404).json({ message: 'Invalid password' });

  delete user.password;
  delete user.id;
  const token = GenerateNewToken(user);

  return res.status(200).json({ token });
};

module.exports = {
  login,
};
