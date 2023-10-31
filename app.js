const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const env = require('./config/env');
const errorHandler = require('./middlewares/errorHandler');

require('./config/database');
const app = express();
const router = require('./routes/router');

app.use(cors());
app.use(morgan('dev'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/public', express.static('public'));

app.use('/api', router);

app.use(errorHandler.get404);
app.use(errorHandler.global);

app.listen(env.PORT, () => {
  console.log(`Server running on port ${env.PORT}`);
});

process.on('uncaughtException', error => {
  console.log('Uncaught Exception: ', error);
  // process.exit(1)
});
