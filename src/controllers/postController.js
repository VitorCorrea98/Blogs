const { postService } = require('../services');

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

module.exports = {
  insert,
  getAll,
};