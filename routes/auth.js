const router = require('express').Router();

const authController = require('../controllers/auth');
const { roleCheck } = require('../middlewares/role');
const isAuthenticated = require('../middlewares/auth');
const upload = require('../middlewares/upload');

// route: /api/auth

router.post('/login', authController.login);
router.post('/signup', authController.userSignup);
router.post(
  '/signup/doctor',
  roleCheck('admin'),
  upload.image(),
  authController.doctorSignup
);
router.post('/signup/admin', roleCheck('admin'), authController.adminSignup);
router.put('/update/:id', isAuthenticated, authController.update);

module.exports = router;
