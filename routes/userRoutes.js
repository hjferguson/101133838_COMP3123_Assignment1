const express = require('express');
const router = express.Router();
const userController = require ('../controllers.userController');

//da routes (ezpz because i wasted all my freetime on developing the controller)
router.post('/api/v1/user/signup', userController.signup);
router.post('/api/v1/user/login', userController.login);

module.exports = router;