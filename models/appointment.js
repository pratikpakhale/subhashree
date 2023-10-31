const Schema = require('mongoose').Schema;

const { emailValidator } = require('../helpers/validators');

const appointmentSchema = new Schema(
  {
    firstName: {
      type: String,
      required: [true, 'First name is required'],
    },
    lastName: {
      type: String,
    },
    email: {
      type: String,
      validate: {
        validator: emailValidator,
        message: props => `${props.value} is not a valid email address`,
      },
      required: [true, 'Email is required'],
    },
    age: {
      type: Number,
      min: [0, 'Age must be a positive number'],
      max: [120, 'Age must be a positive number'],
      required: [true, 'Age is required'],
    },
    gender: {
      type: String,
      enum: ['male', 'female', 'other'],
      required: true,
    },
    phone: {
      type: String,
      required: [true, 'Phone number is required'],
    },
    service: {
      type: String,
      required: [true, 'Service is required'],
    },
    shift: {
      type: String,
      enum: ['morning', 'afternoon', 'evening'],
      required: [true, 'Shift is required'],
    },
    date: {
      type: Date,
      required: [true, 'Date is required'],
    },
    description: {
      type: String,
    },
    status: {
      type: String,
      enum: ['pending', 'accepted', 'rejected'],
      default: 'pending',
    },
    doctor: {
      type: Schema.Types.ObjectId,
      ref: 'Doctor',
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  {
    timestamps: true,
  }
);

module.exports = require('mongoose').model('Appointment', appointmentSchema);
