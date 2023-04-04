const userService = require('../services/UserService');

const getAllSellers = async (req, res) => {
  const seller = await userService.getAllSellers();

  return res.status(200).json(seller);
};

module.exports = {
    getAllSellers,
};
