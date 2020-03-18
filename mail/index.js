const express = require('express');

const router = express.Router();
const nodemailer = require('nodemailer');
const { connectMail } = require('../config/connection');

const transport = {
  host: process.env.MAIL_HOST,
  port: 465,
  auth: {
    user: connectMail.MAIL_USER,
    pass: connectMail.MAIL_PASS,
  },
  tls: {
    rejectUnauthorized: false,
  },
};

const transporter = nodemailer.createTransport(transport);

transporter.verify((error, success) => {
  if (error) {
    console.log(error);
  } else {
    console.log('Server is ready to take messages');
  }
});

router.post('/', (req, res, next) => {
  const {
    firstname, lastname, subject, message, email,
  } = req.body;
  const content = `name: ${firstname} ${lastname} \n email: ${email} \n subject: ${subject} \n message: ${message} `;

  const mail = {
    from: `"${firstname} ${lastname}" <${email}>`,
    to: process.env.MAIL_USER,
    subject,
    text: content,
  };

  transporter.sendMail(mail, (err, data) => {
    if (err) {
      res.json({
        status: 'fail',
      });
    } else {
      res.json({
        status: 'success',
      });
    }
  });
});

module.exports = router;
