const jwt = require('jsonwebtoken');

const User = require('../models/user');
const Doctor = require('../models/doctor');
const Admin = require('../models/admin');

module.exports = async (req, res, next) => {
  try {
    const token = req.headers?.authorization?.split(' ')[1];

    const payload = jwt.verify(token, process.env.JWT_SECRET);

    req.payload = payload;

    switch (payload.type) {
      case 'user':
        req.user = await User.findById(payload.id);
        break;
      case 'doctor':
        req.doctor = await Doctor.findById(payload.id);
        break;
      case 'admin':
        req.admin = await Admin.findById(payload.id);
        break;
      default:
        throw new Error('Invalid user type');
    }

    next();
  } catch (err) {
    err.status = 401;
    next(err);
  }
};
