const router = require('express').Router();

const testRouter = require('./test');
const appointmentRouter = require('./appointment');
const authRouter = require('./auth');
const blogRouter = require('./blog');
const reviewRouter = require('./review');
const specialityRouter = require('./speciality');
const doctorRouter = require('./doctor');

router.use('/', testRouter);
router.use('/appointment', appointmentRouter);
router.use('/auth', authRouter);
router.use('/blog', blogRouter);
router.use('/review', reviewRouter);
router.use('/speciality', specialityRouter);
router.use('/doctor', doctorRouter);

module.exports = router;
