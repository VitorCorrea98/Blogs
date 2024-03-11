const { postService } = require('../services');
const { postValidateUpdate, validateUserIsSame } = require('../services/validations/PostValidate');

const insert = async (req, res) => {
  const post = req.body;
  const { user } = req;
  
  const { status, data } = await postService.insert(post, user.dataValues);

  return res.status(status).json(data);
};

const getAll = async (_req, res) => {
  const { status, data } = await postService.getAll();

  return res.status(status).json(data);
};

const getById = async (req, res) => {
  const { id } = req.params;

  const { status, data } = await postService.getById(id);
  return res.status(status).json(data);
};

const updatePost = async (req, res) => {
  const { id } = req.params;
  const post = req.body;
  const { user } = req;

  const error = await postValidateUpdate(post, id, user);
  if (error) return res.status(error.status).json(error.data);

  await postService.updatePost(id, post);
  const { status, data } = await postService.getById(id);
  return res.status(status).json(data);
};

const deletePost = async (req, res) => {
  const { user } = req;
  const { id } = req.params;

  const error = await validateUserIsSame(id, user);
  if (error) return res.status(error.status).json(error.data);

  await postService.deletePost(id);
  return res.status(204).end();
};

module.exports = {
  insert,
  getAll,
  getById,
  updatePost,
  deletePost,
};