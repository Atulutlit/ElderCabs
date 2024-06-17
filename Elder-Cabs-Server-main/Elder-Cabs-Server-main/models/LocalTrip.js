const mongoose = require('mongoose');

const localTripSchema = new mongoose.Schema({
    sourceCity: {
        type: String,
        required: [true, 'source city is required']
    },
    price: {
        type: Number,
        required: [true, 'price is required']
    },
    pricePerKm: {
        type: Number,
        required: [true, 'price ( per km ) is required']
    },
    pricePerHr: {
        type: Number,
        required: [true, 'price ( per hr ) is required']
    },
    cars: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'cabs',
        required: [true, ' cars is required']
    }
}, { timestamps: true });

const LocalTrip = mongoose.model('localTrip', localTripSchema);

module.exports = LocalTrip;