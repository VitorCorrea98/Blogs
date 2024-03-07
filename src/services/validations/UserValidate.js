const { userValidate, userInsertValidation } = require('./schemas');

const ValidateLogin = (login) => {
  const { error } = userValidate.validate(login);
  if (error) return { status: 400, data: { message: 'Some required fields are missing' } };
};

const ValidateUserInsert = (user) => {
  const { error } = userInsertValidation.validate(user);
  if (error) return { status: 400, data: { message: error.message } };
};

module.exports = {
  ValidateLogin,
  ValidateUserInsert,
};