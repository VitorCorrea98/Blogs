const jwt = require('jsonwebtoken');
const { userService } = require('../services');

const secret = process.env.JWT_SECRET || 'seusecretdetoken';

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

module.exports = {
  validateLogin,
};