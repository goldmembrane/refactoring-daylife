const express = require('express');
const router = express.Router();

const { userController } = require('../controller');

router.post('/signup', userController.siginup.post);
router.post('/signin', userController.siginin.post);
router.post('/signout', userController.siginout.post);
router.get('/info',userController.info.get);

module.exports = router;


