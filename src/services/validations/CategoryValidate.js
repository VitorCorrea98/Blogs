const { categoryValidation } = require('./schemas');

const ValidateCategoryKeys = (category) => {
  const { error } = categoryValidation.validate(category);
  if (error) return { status: 400, data: { message: error.message } };
};

module.exports = {
  ValidateCategoryKeys,
};