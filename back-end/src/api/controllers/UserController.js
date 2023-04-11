const userService = require('../services/UserService');

const getAllSellers = async (req, res) => {
  const seller = await userService.getAllSellers();

  return res.status(200).json(seller);
};

const getUserById = async (req, res) => {
  const { id } = req.params;
  const seller = await userService.getUserById(id);

  return res.status(200).json(seller);
};

module.exports = {
    getAllSellers,
    getUserById,
};
