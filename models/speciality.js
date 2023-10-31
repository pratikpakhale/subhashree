const Schema = require('mongoose').Schema;

const specialitySchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      unique: true,
    },
    description: {
      type: String,
    },
    image: {
      type: String,
    },
    extras: {
      type: Object,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = require('mongoose').model('Speciality', specialitySchema);
