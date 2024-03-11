const Sequelize = require('sequelize');
const { BlogPost, PostCategory, User, Category } = require('../models');
const config = require('../config/config');

const { Op } = Sequelize;

const env = process.env.NODE_ENV || 'development';
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
  return { status: 200, data: allPosts };
};
const getById = async (id) => {
  const post = await BlogPost.findOne({ 
    where: { id },
    include: [
      { model: User, as: 'user', attributes: { exclude: ['password'] } },
      { model: Category, as: 'categories', through: { attributes: [] } },
    ] });
  if (!post) return { status: 404, data: { message: 'Post does not exist' } };
  return { status: 200, data: post };
};
const updatePost = async (id, post) => BlogPost.update(post, { where: { id } });
const deletePost = async (id) => BlogPost.destroy({ where: { id } });
const findByQuery = async (query) => {
  const blogs = await BlogPost
    .findAll({ where: { [Op.or]: [{ title: query }, { content: query }] }, 
      include: [{ model: User, as: 'user' }, { model: Category, as: 'categories' }] });
  const fixedBlogs = blogs.map((blog) => blog.dataValues);
  console.log({ fixedBlogs });
  return { status: 200, data: fixedBlogs };
};

module.exports = { insert, getAll, getById, updatePost, deletePost, findByQuery };