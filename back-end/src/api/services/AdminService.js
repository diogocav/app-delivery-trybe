const { Op } = require('sequelize');
const { User } = require('../../database/models');

const getAllUsers = async () => {
  const result = await User.findAll({
    where: {
      role: {
        [Op.not]: 'administrator',
      },
    },
  });

  return result;
};

const deleteUser = async (id) => {
 const result = await User.destroy(
      { where: { id } },
    );
   return result;
};

const createUser = async (name, email, password, role) => {
  const { dataValues } = await User.create({
      name, 
      email, 
      password,
      role,
    });

return dataValues;
};

module.exports = {
    getAllUsers,
    deleteUser,
    createUser,
};
