const Schema = require('mongoose').Schema;
const bcrypt = require('bcrypt');

const { emailValidator } = require('../helpers/validators');

const doctorSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
  },
  experience: {
    type: String,
  },
  gender: {
    type: String,
    enum: ['male', 'female', 'other'],
  },
  phone: {
    type: String,
    required: [true, 'Phone is required'],
  },
  speciality: {
    type: Schema.Types.ObjectId,
    ref: 'Speciality',
  },
  email: {
    type: String,
    validate: {
      validator: emailValidator,
      message: props => `${props.value} is not a valid email address`,
    },
    required: [true, 'Email is required'],
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
  },
  image: {
    type: String,
  },
  shift: {
    type: String,
    enum: ['morning', 'afternoon', 'evening'],
    default: 'morning',
  },
  extras: {
    type: Object,
  },
});

doctorSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();

  try {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(this.password, salt);

    this.password = hash;

    return next();
  } catch (err) {
    return next(err);
  }
});

module.exports = require('mongoose').model('Doctor', doctorSchema);
