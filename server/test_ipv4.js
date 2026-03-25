const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: 'test@gmail.com',
    pass: 'testpass'
  },
  tls: {
    rejectUnauthorized: false
  }
});

console.log('transporter created');
