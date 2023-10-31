const Review = require('../models/review');

exports.getAll = async (req, res, next) => {
  try {
    const reviews = await Review.find();
    res.status(200).json(reviews);
  } catch (err) {
    next(err);
  }
};

exports.create = async (req, res, next) => {
  try {
    const review = await Review.create({
      ...req.body,
      user: req.payload.id,
      // image: req.file ? req.file.path : null,
    });
    res.status(201).json(review);
  } catch (err) {
    next(err);
  }
};

exports.remove = async (req, res, next) => {
  try {
    const review = await Review.findById(req.params.id);
    if (!review) {
      throw new Error('Review not found');
    }
    if (req.payload.id !== review.user.toString()) {
      throw new Error('Unauthorized');
    }

    await Review.findByIdAndDelete(req.params.id);

    res.status(200).json({
      message: 'Review deleted',
    });
  } catch (err) {
    next(err);
  }
};
