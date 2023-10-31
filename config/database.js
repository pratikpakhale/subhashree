const mongoose = require('mongoose')
require('dotenv').config()

const { MONGODB_URI } = require('./env')

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

const db = mongoose.connection

db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', () => console.log('Connected to MongoDB'))

module.exports = db
