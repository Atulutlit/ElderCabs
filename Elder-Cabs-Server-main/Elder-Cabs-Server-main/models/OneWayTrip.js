const mongoose = require('mongoose');

const oneWayTripSchema = new mongoose.Schema({
    sourceCity: {
        type: String,
        required: [true, 'source city is required']
    },
    destination: {
        type: String,
        required: [true, 'destination city is required']
    },
    pricePerKm: {
        type: Number,
        required: [true, 'price ( per km ) is required']
    },
    distance: {
        type: Number,
        required: [true, 'distance is required']
    },
    cars: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'cabs',
        required: [true, ' cars is required']
    },
    surgePrice: {
        type: Number,
        required: [true, 'surge price is required']
    },
    driverAllowance: {
        type: Number,
        required: [true, 'drive allowance is required']
    },
}, { timestamps: true });

const OneWayTrip = mongoose.model('oneWayTrip', oneWayTripSchema);

module.exports = OneWayTrip;