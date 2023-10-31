const jwt = require('jsonwebtoken');
const env = require('../config/env');

exports.roleCheck = role => {
  // if role is an string, convert it to an array
  if (typeof role === 'string') {
    role = [role];
  }

  return async (req, res, next) => {
    try {
      const token = req.headers?.authorization?.split(' ')[1];
      const payload = jwt.verify(token, env.JWT_SECRET);
      req.payload = payload;
      if (!role.includes(payload.type)) {
        return res.status(401).json({
          message: 'Unauthorized',
        });
      }
      next();
    } catch (err) {
      next(err);
    }
  };
};
