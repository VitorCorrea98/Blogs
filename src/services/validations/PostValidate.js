const { blogPostValidation } = require('./schemas');
const { Category } = require('../../models');

const ValidatePostKeys = async (req, res, next) => {
  const post = req.body;
  const { error } = blogPostValidation.validate(post);
  if (error && (error.message.includes('title') || error.message.includes('content'))) {
    return res.status(400).json({ message: 'Some required fields are missing' });
  }

  const { categoryIds } = post;

  const PromiseIds = await categoryIds.map(async (category) => Category.findByPk(category));
  const ResultIds = (await Promise.all(PromiseIds)).filter((id) => id === null);

  if (ResultIds.length) {
    return res.status(400).json({ message: 'one or more "categoryIds" not found' }); 
  }

  next();
};

module.exports = {
  ValidatePostKeys,
};