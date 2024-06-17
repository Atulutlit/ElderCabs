const mongoose = require('mongoose');

// trip schema
const tripSchema = new mongoose.Schema({
    trip: String,
    sourceCity: String,
    destination: String,
    destinations: [String],
    pickupDate: String,
    pickupTime: String,
    returnDate: String,
}, { timestamps: false });

// booking schema
const bookingSchema = new mongoose.Schema({
    fname: {
        type: String,
    },
    lname: {
        type: String,
    },
    email: {
        type: String,
    },
    phoneNo: {
        type: String,
    },
    // state: {
    //     type: String,
    // },
    // city: {
    //     type: String,
    // },
    pickupAddress: {
        type: String,
    },
    cab: {
        type: String,
    },
    paymentPercent: {
        type: Number,
    },
    amount: {
        type: Number,
    },
    payment: {
        type: Boolean,
        default: false,
    },
    paymentId: {
        type: String,
        default: null,
    },
    trip: tripSchema,
}, { timestamps: true });

const Booking = mongoose.model('bookings', bookingSchema)
module.exports = Booking;