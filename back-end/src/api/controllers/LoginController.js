const crypto = require('crypto');
const generateToken = require('../middlewares/generateToken');
const loginService = require('../services/LoginService');

const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await loginService.loginCheck(email);

  if (!user) { return res.status(404).json({ message: 'Invalid email' }); }

  const hash = crypto.createHash('md5').update(password).digest('hex');
  
  const checkPassword = user.password === hash;

  if (!checkPassword) return res.status(404).json({ message: 'Invalid password' });

  const payload = { id: user.id, name: user.name, email: user.email, role: user.role };
  const token = generateToken.GenerateNewToken(payload);

  return res.status(200).json({ token });
};

module.exports = {
  login,
};

// (3, 
// 'Cliente Zé Birita', 
// 'zebirita@email.com', 
// '1c37466c159755ce1fa181bd247cb925', 
// 'customer'); 
// senha: md5('$#zebirita#$')
