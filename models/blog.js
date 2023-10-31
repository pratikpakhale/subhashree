const Schema = require('mongoose').Schema;

const blogSchema = new Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
  },
  description: {
    type: String,
  },
  image: {
    type: String,
  },
  doctor: {
    type: Schema.Types.ObjectId,
    ref: 'Doctor',
  },
  body: {
    type: String,
    required: [true, 'Body is required'],
  },
  meta: {
    likes: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
    views: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
  },
});

module.exports = require('mongoose').model('Blog', blogSchema);
