const router = require('express').Router();
const validateJWT = require('../auth/validateJWT');
const { postController } = require('../controllers');
const { ValidatePostKeys } = require('../services/validations/PostValidate');

router.get('/search', validateJWT, postController.findByQuery);
router.put('/:id', validateJWT, postController.updatePost);
router.post('/', validateJWT, ValidatePostKeys, postController.insert);
router.get('/', validateJWT, postController.getAll);
router.delete('/:id', validateJWT, postController.deletePost);
router.get('/:id', validateJWT, postController.getById);

module.exports = router;