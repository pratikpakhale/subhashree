const Doctor = require('../models/doctor');

exports.getAll = async (req, res, next) => {
  try {
    const doctors = await Doctor.find();
    res.status(200).json(doctors);
  } catch (err) {
    next(err);
  }
};

exports.getOne = async (req, res, next) => {
  try {
    const doctor = await Doctor.findById(req.params.id);
    res.status(200).json(doctor);
  } catch (err) {
    next(err);
  }
};
