const router = require('express').Router();
const validateJWT = require('../auth/validateJWT');
const { postController } = require('../controllers');
const { ValidatePostKeys } = require('../services/validations/PostValidate');

router.post('/', validateJWT, ValidatePostKeys, postController.insert);
router.get('/', validateJWT, postController.getAll);
router.get('/:id', validateJWT, postController.getById);

module.exports = router;