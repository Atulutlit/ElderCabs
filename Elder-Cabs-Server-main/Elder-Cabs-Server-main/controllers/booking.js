const Booking = require("../models/Booking");

exports.create = async (data) => {
    try {
        const result = await Booking.create(data);
        return result;
    } catch (err) {
        throw err;
    }
}

exports.paymentSuccess = async (req, res) => {
    try {
        const result = await Booking.findByIdAndUpdate(req.body.bookingId, { payment: true });
        if (result) {
            res.json(result);
        } else {
            res.status(400).send({ message: 'payment could not be updated' });
        }
    } catch (err) {
        res.status(400).send(err);
    }
}