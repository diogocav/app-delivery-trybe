const { User } = require('../../database/models');

const register = async (name, email, password) => {
    const { dataValues } = await User.create({
        name, 
        email, 
        password,
      });

  return dataValues;
};

const findOne = async (type) => {
    const user = await User.findOne({
      where: { type },
    });
  
    return user;
  };

module.exports = {
    register,
    findOne,
};