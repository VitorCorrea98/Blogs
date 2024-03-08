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

const getAll = async () => {
  const users = await User.findAll({ attributes: { exclude: ['password'] } });
  return users;
};

const findUserByEmailToken = async (email) => {
  const user = await User.findOne({ where: { email }, attributes: { exlcude: ['passoword'] } });
  return user;
};

const getUserById = async (id, foundUser) => {
  const user = await User.findOne({ where: { id }, attributes: { exclude: ['password'] } });
  const checkUserId = foundUser.dataValues.id === Number(id);

  if (!user || !checkUserId) return { status: 404, data: { message: 'User does not exist' } };
  return { status: 200, data: user };
};

module.exports = {
  findUserByEmail,
  validateLogin,
  insert,
  getAll,
  findUserByEmailToken,
  getUserById,
};