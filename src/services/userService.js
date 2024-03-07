const { User } = require('../models');
const { ValidateLogin, ValidateUserInsert } = require('./validations/UserValidate');

const findUserByEmail = async (email) => {
  const user = await User.findOne({ where: { email } });

  return user;
};

const validateLogin = async (login) => {
  const { password, email } = login;

  const error = ValidateLogin(login);
  if (error) return { status: error.status, data: error.data };

  const userFound = await findUserByEmail(email);

  if (!userFound || (userFound && userFound.password !== password)) {
    return { status: 400, data: { message: 'Invalid fields' } };
  }
};

const insert = async (user) => {
  const keysError = ValidateUserInsert(user);
  if (keysError) return { status: keysError.status, data: keysError.data };

  const { email } = user;
  const checkUser = await findUserByEmail(email);
  if (checkUser) return { status: 409, data: { message: 'User already registered' } };

  await User.create(user);
};

module.exports = {
  findUserByEmail,
  validateLogin,
  insert,
};