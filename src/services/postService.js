const Sequelize = require('sequelize');
const { BlogPost, PostCategory, User, Category } = require('../models');

const config = require('../config/config');

const env = process.env.NODE_ENV || 'development';
// Ajustamos para usar a configuração correta para nosso ambiente
const sequelize = new Sequelize(config[env]);

const insert = async (post, user) => {
  const result = await sequelize.transaction(async (t) => {
    const { title, content, categoryIds } = post;
    const { id } = user;

    const newBlogPost = { title, content, userId: id };
    const newBlog = await BlogPost.create(newBlogPost, { transaction: t });

    await Promise.all(categoryIds.map(async (category) => PostCategory
      .create({ postId: newBlog.dataValues.id, categoryId: category }, { transaction: t })));

    return { status: 201, data: newBlog };
  });
  return result;
};

const getAll = async () => {
  const allPosts = await BlogPost.findAll({
    include: [
      { model: User, as: 'user', attributes: { exclude: ['password'] } },
      { model: Category, as: 'categories', through: { attributes: [] } },
    ],
  });
  console.log({ allPosts });
  return { status: 200, data: allPosts };
};

module.exports = {
  insert,
  getAll,
};