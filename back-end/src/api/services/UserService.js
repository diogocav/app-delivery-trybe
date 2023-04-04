const { User } = require('../../database/models');

const getAllSellers = async () => {
  const result = await User.findAll({
    where: { role: 'seller' },
  });

  return result;
};

const findOne = async (email) => {
  const result = await User.findOne({
    where: { email },
  });

  return result;
};

module.exports = {
  getAllSellers,
  findOne,
};