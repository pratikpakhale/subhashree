const Schema = require('mongoose').Schema;

const reviewSchema = new Schema(
  {
    description: {
      type: String,
      required: [true, 'Description is required'],
    },
    rating: {
      type: Number,
      required: [true, 'Rating is required'],
      min: [0, 'Rating must be a positive number'],
      max: [5, 'Rating must be a positive number'],
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    photo: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = require('mongoose').model('Review', reviewSchema);
