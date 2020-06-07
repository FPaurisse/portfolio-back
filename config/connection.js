const mongoose = require('mongoose');

const connection = process.env.DATABASE_URL;

const connectDb = () => mongoose.connect(
  connection,
  { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false },
);

const connectMail = {
  MAIL_HOST: process.env.MAIL_HOST,
  MAIL_USER: process.env.MAIL_USER,
  MAIL_PASS: process.env.MAIL_PASS,
};

module.exports = { connectDb, connectMail };
