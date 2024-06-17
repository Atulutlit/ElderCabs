const { sendMail } = require('../mails/contact');

const router = require('express').Router();

router.post('/sendMail', sendMail);

module.exports = router;