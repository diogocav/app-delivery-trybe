const bcrypt = require('bcryptjs');
const GenerateNewToken = require('../middlewares/generateToken');
const loginService = require('../services/LoginService');

const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await loginService.loginCheck(email);

  if (!user) { return res.status(401).json({ message: 'Invalid email' }); }

  let checkPassword;
  if (user.password !== undefined) {
    checkPassword = bcrypt.compareSync(password, user.password);
  }
  if (!checkPassword) return res.status(401).json({ message: 'Invalid password' });

  delete user.password;
  const token = GenerateNewToken(user);

  return res.status(200).json({ token });
};

module.exports = {
  login,
};