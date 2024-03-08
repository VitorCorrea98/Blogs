const router = require('express').Router();
const validateJWT = require('../auth/validateJWT');
const { userController } = require('../controllers');

router.post('/', userController.insert);
router.get('/', validateJWT, userController.getAll);
router.get('/:id', validateJWT, userController.getUserById);

module.exports = router;