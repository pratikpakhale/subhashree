const router = require('express').Router();

const specialityController = require('../controllers/speciality');
const { roleCheck } = require('../middlewares/role');
const { image } = require('../middlewares/upload');

// route: /api/speciality

router.get('/', specialityController.getAll);
router.get('/:id', specialityController.getOne);
router.post('/', roleCheck('admin'), image(), specialityController.create);
router.delete('/:id', roleCheck('admin'), specialityController.remove);

module.exports = router;
