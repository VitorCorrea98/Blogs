const { blogPostValidation, blogUpdateValidation } = require('./schemas');
const { Category, BlogPost } = require('../../models');
const { postService } = require('..');

const ValidatePostKeys = async (req, res, next) => {
  const post = req.body;
  const { error } = blogPostValidation.validate(post);
  if (error) {
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

const postValidateUpdate = async (post, id, user) => {
  const { error } = blogUpdateValidation.validate(post);
  if (error) return { status: 400, data: { message: 'Some required fields are missing' } };

  const blogPost = await BlogPost.findByPk(id);
  console.log({ blogPost, user });

  const checkUser = user.dataValues.id === blogPost.dataValues.userId;
  if (!checkUser) return { status: 401, data: { message: 'Unauthorized user' } };
};

module.exports = {
  ValidatePostKeys,
  postValidateUpdate,
};