const router = require('express').Router();
const { userController } = require('../controllers');

router.post('/', userController.validateLogin);

module.exports = router;