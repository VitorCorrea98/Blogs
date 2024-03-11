const { User } = require('../models');
const { ValidateLogin, ValidateUserInsert } = require('./validations/UserValidate');

const findUserByEmail = async (email) => User.findOne({ where: { email } });

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

const getAll = async () => User.findAll({ attributes: { exclude: ['password'] } });

const findUserByEmailToken = async (email) => User
  .findOne({ where: { email }, attributes: { exlcude: ['passoword'] } });

const getUserById = async (id, foundUser) => {
  const user = await User.findOne({ where: { id }, attributes: { exclude: ['password'] } });
  const checkUserId = foundUser.dataValues.id === Number(id);

  if (!user || !checkUserId) return { status: 404, data: { message: 'User does not exist' } };
  return { status: 200, data: user };
};

const deleteUserMe = async (user) => {
  console.log({ user });

  await User.destroy({ where: { id: user.id } });
};

module.exports = {
  findUserByEmail, 
  validateLogin,
  insert,
  getAll,
  findUserByEmailToken,
  getUserById,
  deleteUserMe,
};