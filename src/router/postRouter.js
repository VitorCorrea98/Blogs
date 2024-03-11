const router = require('express').Router();
const validateJWT = require('../auth/validateJWT');
const { postController } = require('../controllers');
const { ValidatePostKeys } = require('../services/validations/PostValidate');

router.put('/:id', validateJWT, postController.updatePost);
router.post('/', validateJWT, ValidatePostKeys, postController.insert);
router.get('/', validateJWT, postController.getAll);
router.get('/:id', validateJWT, postController.getById);
router.delete('/:id', validateJWT, postController.deletePost);

module.exports = router;