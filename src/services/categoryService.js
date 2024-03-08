const { Category } = require('../models');
const { ValidateCategoryKeys } = require('./validations/CategoryValidate');

const insert = async (category) => {
  const validateKeys = ValidateCategoryKeys(category);
  if (validateKeys) return { status: validateKeys.status, data: validateKeys.data };

  const { name } = category;

  const newCategory = await Category.create({ name });
  return { status: 201, data: newCategory };
};

module.exports = {
  insert,
};