const { categoryService } = require('../services');

const insert = async (req, res) => {
  const category = req.body;

  const { status, data } = await categoryService.insert(category);
  return res.status(status).json(data);
};

module.exports = {
  insert,
};