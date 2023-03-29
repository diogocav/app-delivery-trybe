const { User } = require('../../database/models');

const loginCheck = async (email) => {
  const user = await User.findOne({
    where: { email },
  });

  return user;
};

module.exports = {
    loginCheck,
};