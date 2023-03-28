const Users = require('../../database/models/User');

const loginCheck = async (email) => {
  const user = await Users.findOne({
    where: { email },
  });

  return user;
};

module.exports = {
    loginCheck,
};