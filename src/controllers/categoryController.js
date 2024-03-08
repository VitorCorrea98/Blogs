const { categoryService } = require('../services');

const insert = async (req, res) => {
  const category = req.body;

  const { status, data } = await categoryService.insert(category);
  return res.status(status).json(data);
};

const getAll = async (req, res) => {
  const { status, data } = await categoryService.getAll();
  return res.status(status).json(data);
};

module.exports = {
  insert,
  getAll,
};