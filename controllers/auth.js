const User = require('../models/user');
const Doctor = require('../models/doctor');
const Admin = require('../models/admin');

const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const env = require('../config/env');

exports.login = async (req, res, next) => {
  try {
    const { type, username, email, password } = req.body;

    let user = null;

    switch (type) {
      case 'user':
        user = await User.findOne({
          $or: [{ username }, { email }],
        });
        break;
      case 'doctor':
        user = await Doctor.findOne({ email });
        break;
      case 'admin':
        user = await Admin.findOne({ email });
        break;
      default:
        throw new Error('Invalid user type');
    }

    if (!user) {
      return res.status(404).json({
        message: 'User not found',
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({
        message: 'Wrong password',
      });
    }

    const payload = {
      id: user.id,
      type,
    };

    const token = jwt.sign(payload, env.JWT_SECRET, {
      expiresIn: '5d',
    });

    return res.status(200).json({
      message: 'Login successful',
      user,
      type,
      token,
    });
  } catch (err) {
    next(err);
  }
};

exports.userSignup = async (req, res, next) => {
  try {
    const user = await User.create(req.body);
    res.status(201).json(user);
  } catch (err) {
    next(err);
  }
};

exports.doctorSignup = async (req, res, next) => {
  try {
    const doctor = await Doctor.create({
      ...req.body,
      image: req.file ? req.file.path : null,
    });
    res.status(201).json(doctor);
  } catch (err) {
    next(err);
  }
};

exports.adminSignup = async (req, res, next) => {
  try {
    const admin = await Admin.create(req.body);
    res.status(201).json(admin);
  } catch (err) {
    next(err);
  }
};

exports.update = async (req, res, next) => {
  try {
    const { type } = req.body;

    if (
      type === 'user' &&
      (req.payload.id == req.params.id || req.payload.type === 'admin')
    ) {
      const user = await User.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
      });
      return res.status(200).json(user);
    }

    if (
      type === 'doctor' &&
      (req.payload.id == req.params.id || req.payload.type === 'admin')
    ) {
      const doctor = await Doctor.findByIdAndUpdate(
        req.params.id,
        {
          ...req.body,
          image: req.file ? req.file.path : null,
        },
        {
          new: true,
        }
      );
      return res.status(200).json(doctor);
    }

    if (type === 'admin' && req.payload.type === 'admin') {
      const admin = await Admin.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
      });
      return res.status(200).json(admin);
    }
    return res
      .status(400)
      .json({ message: 'You are not authorized to update this user' });
  } catch (err) {
    next(err);
  }
};
