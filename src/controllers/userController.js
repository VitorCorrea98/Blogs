const jwt = require('jsonwebtoken');
const { userService } = require('../services');

const secret = process.env.JWT_SECRET || 'suaSenhaSecreta';

const validateLogin = async (req, res) => {
  const login = req.body;

  const error = await userService.validateLogin(login);
  if (error) return res.status(error.status).json(error.data);

  const { email } = login;
  
  const jwtConfig = {
    expiresIn: '7d',
    algorithm: 'HS256',
  };
  
  const token = jwt.sign({ data: { email } }, secret, jwtConfig);
  
  return res.status(200).json({ token });
};

const insert = async (req, res) => {
  const user = req.body;
  console.log({ user });

  const checkUserAndKeys = await userService.insert(user);
  if (checkUserAndKeys) return res.status(checkUserAndKeys.status).json(checkUserAndKeys.data);

  const jwtConfig = {
    expiresIn: '7d',
    algorithm: 'HS256',
  };

  const { email } = user;
  
  const token = jwt.sign({ data: { email } }, secret, jwtConfig);
  
  return res.status(201).json({ token });
};

const getAll = async (_req, res) => {
  const users = await userService.getAll();
  return res.status(200).json(users);
};

module.exports = {
  validateLogin,
  insert,
  getAll,
};