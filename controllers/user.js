const User = require('../models/user');

exports.me = async (req, res, next) => {
  try {
    const id = req.payload.id;

    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    return res.status(200).json({ user });
  } catch (err) {
    next(err);
  }
};
