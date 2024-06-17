const mongoose = require('mongoose');

const transferTripSchema = new mongoose.Schema({
    sourceCity: {
        type: String,
        required: [true, 'source city is required']
    },
    destination: {
        type: String,
        required: [true, 'destination city is required']
    },
    price: {
        type: Number,
        required: [true, 'price is required']
    },
    surgePrice: {
        type: Number,
        required: [true, 'price is required']
    },
    cars: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'cabs',
        required: [true, ' cars is required']
    }
}, { timestamps: true });

const TransferTrip = mongoose.model('transferTrip', transferTripSchema);

module.exports = TransferTrip;