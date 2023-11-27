const express = require('express');
const router = express.Router();
const userController = require ('../controllers/userController');

//da routes (ezpz because i wasted all my freetime on developing the controller)
router.post('/api/v2/user/signup', userController.signup);
router.post('/api/v2/user/signin', userController.signin);

module.exports = router;