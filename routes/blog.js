const router = require('express').Router();

const blogController = require('../controllers/blog');
const { roleCheck } = require('../middlewares/role');
const isAuthenticated = require('../middlewares/auth');
const upload = require('../middlewares/upload');

// route: /api/blog

router.get('/', blogController.getAll);
router.get('/:id', blogController.getOne);
router.get('/:id/like', isAuthenticated, blogController.like);
router.get('/:id/view', isAuthenticated, blogController.view);
router.post(
  '/',
  roleCheck(['admin', 'doctor']),
  upload.image(),
  blogController.create
);
router.put(
  '/:id',
  roleCheck(['admin', 'doctor']),
  upload.image(),
  blogController.update
);
router.delete('/:id', roleCheck(['admin', 'doctor']), blogController.remove);

module.exports = router;
