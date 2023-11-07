const router = require('express').Router();

const doctorController = require('../controllers/doctor');

router.get('/', doctorController.getAll);

router.get('/:id', doctorController.getOne);

module.exports = router;
