require('../config/database');

const Admin = require('../models/admin');

const name = process.argv[2];
const email = process.argv[3];
const password = process.argv[4];

Admin.create({
  name,
  email,
  password,
})
  .then(admin => {
    console.log(admin);
    process.exit();
  })
  .catch(err => {
    console.log(err);
    process.exit();
  });
