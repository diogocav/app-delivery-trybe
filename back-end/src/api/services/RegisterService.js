const { User } = require('../../database/models');

const register = async (name, email, password) => {
    const { dataValues } = await User.create({
        name, 
        email, 
        password,
        role: 'customer',
      });

  return dataValues;
};

const findOne = async (type, value) => {
  const payload = {};
  payload[type] = value;
  const user = await User.findOne({
      where: { ...payload },
    });
  
    return user;
  };

module.exports = {
    register,
    findOne,
};