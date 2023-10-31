const Schema = require('mongoose').Schema;
const bcrypt = require('bcrypt');

const { emailValidator } = require('../helpers/validators');

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: [true, 'Username is required'],
      unique: true,
    },
    name: {
      type: String,
      required: [true, 'Name is required'],
    },
    email: {
      type: String,
      validate: {
        validator: emailValidator,
        message: props => `${props.value} is not a valid email address`,
      },
      required: [true, 'Email is required'],
      unique: true,
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre('save', async function (next) {
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

module.exports = require('mongoose').model('User', userSchema);
