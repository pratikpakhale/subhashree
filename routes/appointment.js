const router = require('express').Router();

const appointmentController = require('../controllers/appointment');
const { roleCheck } = require('../middlewares/role');
const isAuthenticated = require('../middlewares/auth');

// route: /api/appointment

router.get('/', roleCheck(['doctor', 'admin']), appointmentController.getAll);
router.get(
  '/pending',
  roleCheck(['doctor', 'admin']),
  appointmentController.getPending
);
router.get('/:id', isAuthenticated, appointmentController.getOne);

router.get(
  '/:id/approve',
  roleCheck(['doctor', 'admin']),
  appointmentController.approve
);
router.get(
  '/:id/reject',
  roleCheck(['doctor', 'admin']),
  appointmentController.reject
);
router.post('/', isAuthenticated, appointmentController.create);

module.exports = router;
