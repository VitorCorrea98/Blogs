const Joi = require('joi');

const userValidate = Joi.object({
  email: Joi.string().min(1).required(),
  password: Joi.string().min(1).required(),
});

const userInsertValidation = Joi.object({
  displayName: Joi.string().min(8).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  image: Joi.string(),
});

const categoryValidation = Joi.object({
  name: Joi.string().required(),
});

module.exports = {
  userValidate,
  userInsertValidation,
  categoryValidation,
};