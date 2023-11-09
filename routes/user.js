const router = require('express').Router();

const isAuthenticated = require('../middlewares/auth');

const userController = require('../controllers/user');

router.get('/me', isAuthenticated, userController.me);

module.exports = router;
