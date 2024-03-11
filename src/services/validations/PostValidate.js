const { blogPostValidation, blogUpdateValidation } = require('./schemas');
const { Category, BlogPost } = require('../../models');

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

const validateUserIsSame = async (id, user) => {
  const blogPost = await BlogPost.findByPk(id);
  
  if (!blogPost) return { status: 404, data: { message: 'Post does not exist' } };
  const checkUser = user.dataValues.id === blogPost.dataValues.userId;
  if (!checkUser) return { status: 401, data: { message: 'Unauthorized user' } };
};

const postValidateUpdate = async (post, id, user) => {
  const { error } = blogUpdateValidation.validate(post);
  if (error) return { status: 400, data: { message: 'Some required fields are missing' } };

  const checkUser = await validateUserIsSame(id, user);
  if (checkUser) return { status: checkUser.status, data: checkUser.data };
};

module.exports = {
  ValidatePostKeys,
  postValidateUpdate,
  validateUserIsSame,
};