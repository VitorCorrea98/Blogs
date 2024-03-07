const { User } = require('../models');
const { ValidateLogin } = require('./validations/UserValidate');

const findUserByEmail = async (email) => {
  const user = await User.findOne({ where: { email } });

  return user;
};

const validateLogin = async (login) => {
  const { password, email } = login;

  const error = ValidateLogin(login);
  if (error) return { status: error.status, data: error.data };

  const userFound = await findUserByEmail(email);
  console.log({ userFound });

  if (!userFound || (userFound && userFound.password !== password)) {
    return { status: 400, data: { message: 'Invalid fields' } };
  }
};

module.exports = {
  findUserByEmail,
  validateLogin,
};