const Speciality = require('../models/speciality');

exports.getAll = async (req, res, next) => {
  try {
    const specialities = await Speciality.find();
    res.status(200).json(specialities);
  } catch (err) {
    next(err);
  }
};

exports.getOne = async (req, res, next) => {
  try {
    const speciality = await Speciality.findById(req.params.id);
    res.status(200).json(speciality);
  } catch (err) {
    next(err);
  }
};

exports.create = async (req, res, next) => {
  try {
    const speciality = await Speciality.create({
      ...req.body,
      image: req.file ? req.file.path : null,
    });
    res.status(201).json(speciality);
  } catch (err) {
    next(err);
  }
};

exports.remove = async (req, res, next) => {
  try {
    const speciality = await Speciality.findByIdAndRemove(req.params.id);
    res.status(200).json(speciality);
  } catch (err) {
    next(err);
  }
};
