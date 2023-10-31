const router = require('express').Router();

const reviewController = require('../controllers/review');
const { roleCheck } = require('../middlewares/role');
const isAuthenticated = require('../middlewares/auth');
const upload = require('../middlewares/upload');

// route: /api/review

router.get('/', reviewController.getAll);
router.post('/', isAuthenticated, upload.image(), reviewController.create);
router.delete('/:id', roleCheck(['admin', 'user']), reviewController.remove);

module.exports = router;
