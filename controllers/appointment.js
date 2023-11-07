const Appointment = require('../models/appointment');

const env = require('../config/env');

const accountSid = env.TWILIO_ACCOUNT_SID;
const authToken = '[AuthToken]';
const client = require('twilio')(accountSid, authToken);

exports.getAll = async (req, res, next) => {
  try {
    if (req.payload.type === 'doctor') {
      const doctorId = req.payload.id || req.doctor._id;
      const appointments = await Appointment.find({
        doctor: doctorId,
      });
      res.status(200).json(appointments);
    } else if (req.payload.type === 'admin') {
      const appointments = await Appointment.find();
      res.status(200).json(appointments);
    }
  } catch (err) {
    next(err);
  }
};

exports.getOne = async (req, res, next) => {
  try {
    if (req.payload.type === 'doctor') {
      const doctorId = req.payload.id || req.doctor._id;
      const appointment = await Appointment.findById(req.params.id);
      if (appointment.doctor.toString() !== doctorId.toString()) {
        throw new Error('Unauthorized');
      }
      return res.status(200).json(appointment);
    } else if (req.payload.type === 'user') {
      const appointment = await Appointment.findById(req.params.id);
      if (appointment.createdBy.toString() !== req.payload.id.toString()) {
        throw new Error('Unauthorized');
      }
      return res.status(200).json(appointment);
    } else if (req.payload.type === 'admin') {
      const appointment = await Appointment.findById(req.params.id);
      return res.status(200).json(appointment);
    }
  } catch (err) {
    next(err);
  }
};

exports.getPending = async (req, res, next) => {
  try {
    if (req.payload.type === 'doctor') {
      const doctorId = req.payload.id || req.doctor._id;
      const appointments = await Appointment.find({
        doctor: doctorId,
        status: 'pending',
      });
      res.status(200).json(appointments);
    } else if (req.payload.type === 'admin') {
      const appointments = await Appointment.find({
        status: 'pending',
      });
      res.status(200).json(appointments);
    }
  } catch (err) {
    next(err);
  }
};

exports.create = async (req, res, next) => {
  try {
    const appointment = await Appointment.create({
      ...req.body,
      createdBy: req.payload.id,
    });
    res.status(201).json(appointment);
  } catch (err) {
    next(err);
  }
};

exports.approve = async (req, res, next) => {
  try {
    const doctorId = req.payload.id || req.doctor._id;
    const appointment = await Appointment.findById(req.params.id).populate(
      'createdBy'
    );
    if (
      appointment.doctor.toString() === doctorId.toString() ||
      req.payload.type === 'admin'
    ) {
      appointment.status = 'accepted';
      await appointment.save();
      return res.status(200).json(appointment);
    }

    res.status(401).json({
      message: 'Unauthorized',
    });

    const patientPhone = appointment?.createdBy?.phone;

    if (env.TWILIO_PHONE_NUMBER && patientPhone) {
      client.messages.create({
        body:
          'Your appointment has been approved. Date - ' +
          new Date(appointment.date).toDateString(),
        from: env.TWILIO_PHONE_NUMBER,
        to: '+91' + patientPhone,
      });
    }
    return;
  } catch (err) {
    next(err);
  }
};

exports.reject = async (req, res, next) => {
  try {
    const doctorId = req.payload.id || req.doctor._id;
    const appointment = await Appointment.findById(req.params.id);
    if (
      appointment.doctor.toString() === doctorId.toString() ||
      req.payload.type === 'admin'
    ) {
      appointment.status = 'rejected';
      await appointment.save();
      return res.status(200).json(appointment);
    }

    return res.status(401).json({
      message: 'Unauthorized',
    });
  } catch (err) {
    next(err);
  }
};
