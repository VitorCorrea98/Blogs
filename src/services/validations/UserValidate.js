const { userService } = require('..');
const { userValidate } = require('./schemas');

const ValidateLogin = (login) => {
  const { error } = userValidate.validate(login);
  if (error) {
    return { status: 400, data: { message: 'Some required fields are missing' } };
  }
};

const ValidateUserExist = async (login) => {
  const { password, email } = login;

  console.log({ login });

  const userFound = await userService.findUserByEmail(email);
  if (!userFound || (userFound && !userFound.password === password)) {
    return { status: 400, data: { messsage: 'Invalid fields' } };
  } 
};

module.exports = {
  ValidateLogin,
  ValidateUserExist,
};