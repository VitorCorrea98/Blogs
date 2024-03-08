const router = require('express').Router();
const validateJWT = require('../auth/validateJWT');
const { categoryController } = require('../controllers');

router.post('/', validateJWT, categoryController.insert);

module.exports = router;