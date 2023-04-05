const Joi = require('joi');

const loginValidation = (user) => {
  const checkUser = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
  }).required().messages({
    'string.empty': 'All fields must be filled',
    'string.email': 'Invalid email or password',
    'string.min': 'Invalid email or password',
  });

  const { error } = checkUser.validate(user);

  return error;
};

const validateLogin = (req, res, next) => {
  const { email, password } = req.body;
  const error = loginValidation({ email, password });
  if (error !== undefined) {
    // if (error.details[0].message.includes('All fields')) {
    //   return res.status(404).json({ message: error.details[0].message });
    // }
    return res.status(404).json({ message: error.details[0].message });
  }
  return next();
};

module.exports = validateLogin;