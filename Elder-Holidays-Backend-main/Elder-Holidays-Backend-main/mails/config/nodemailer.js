const nodemailer = require("nodemailer");

// Email Configuration
exports.transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL || "ingeltemails@gmail.com",
    pass: process.env.PASSWORD || "mxxenzusaiwjniqz",
  },
});

exports.options = {
  from: process.env.EMAIL || "ingeltemails@gmail.com",
  to: "info@elderholidays.com",
  subject: "Elder Cabs Query",
};
