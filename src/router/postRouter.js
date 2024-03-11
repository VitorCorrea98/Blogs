const router = require('express').Router();
const validateJWT = require('../auth/validateJWT');
const { postController } = require('../controllers');
const { ValidatePostKeys } = require('../services/validations/PostValidate');

router.post('/', validateJWT, ValidatePostKeys, postController.insert);

module.exports = router;