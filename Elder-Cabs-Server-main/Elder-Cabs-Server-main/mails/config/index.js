const nodemailer = require('nodemailer');

exports.transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL || "ingeltemails@gmail.com",
        pass: process.env.PASSWORD || "mxxenzusaiwjniqz",
    },
});