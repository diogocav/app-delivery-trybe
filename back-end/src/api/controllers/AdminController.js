const crypto = require('crypto');
const adminService = require('../services/AdminService');

const getAllUsers = async (req, res) => {
  const users = await adminService.getAllUsers();

  return res.status(200).json(users);
};

const deleteUser = async (req, res) => {
  const { role } = req;
  const { id } = req.params;
  if (role !== 'administrator') {
    return res.status(409)
      .json({ errorMessage: 'You dont have acess' });
  }
  const result = await adminService.deleteUser(id);

  if (result === 1) return res.status(204).json({ message: 'Finished' });
};

const newUser = async (req, res) => {
  const adminRole = req.role;
  const { name, email, password, role } = req.body;

  if (adminRole !== 'administrator') {
    return res.status(409).json({ errorMessage: 'You dont have acess' });
  }

  const passwordHash = crypto.createHash('md5').update(password).digest('hex');
  await adminService.createUser(name, email, passwordHash, role);

  return res.status(201).json({ message: 'account created' });
};

module.exports = {
  getAllUsers,
  deleteUser,
  newUser,
};
