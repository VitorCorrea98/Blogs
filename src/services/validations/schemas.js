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

const blogPostValidation = Joi.object({
  title: Joi.string().min(1).required(),
  content: Joi.string().min(1).required(),
  categoryIds: Joi.array().items(Joi.number()),
});

const blogUpdateValidation = Joi.object({
  title: Joi.string().min(1).required().messages({
    'any.required': 'Some required fields are missing',
  }),
  content: Joi.string().min(1).required().messages({
    'any.required': 'Some required fields are missing',
  }),
});

module.exports = {
  userValidate,
  userInsertValidation,
  categoryValidation,
  blogPostValidation,
  blogUpdateValidation,
};