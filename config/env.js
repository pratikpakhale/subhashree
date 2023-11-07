require('dotenv').config();

const {
  PORT,
  MONGODB_URI,
  JWT_SECRET,
  TWILIO_ACCOUNT_SID,
  TWILIO_PHONE_NUMBER,
} = process.env;

const config = {
  PORT: 8080,
  MONGODB_URI,
  JWT_SECRET,
  TWILIO_ACCOUNT_SID,
  TWILIO_PHONE_NUMBER,
};

module.exports = config;
