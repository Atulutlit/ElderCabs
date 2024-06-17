const router = require('express').Router();
const { paymentSuccess } = require('../controllers/booking');
const createPayment = require('../instamojo/createPayment');

// create payment
router.post('/createPayment', createPayment);

// update payment request
router.put(`/paymentSuccess`, paymentSuccess);

module.exports = router;