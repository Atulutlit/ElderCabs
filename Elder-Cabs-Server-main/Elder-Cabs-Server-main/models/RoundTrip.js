const mongoose = require('mongoose');

const roundTripSchema = new mongoose.Schema({
    sourceCity: {
        type: String,
        required: [true, 'source city is required']
    },
    destinations: {
        type: [String],
        required: [true, 'destination city is required']
    },
    pricePerKm: {
        type: Number,
        required: [true, 'price ( per km ) is required']
    },
    noOfKmCharge: {
        type: Number,
        required: [true, 'noOfKmCharge is required']
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
    // stateTax: {
    //     type: Number,
    //     required: [true, 'state tax is required']
    // },
    // tollTax: {
    //     type: Number,
    //     required: [true, 'toll Tax is required']
    // }
}, { timestamps: true });

const RoundTrip = mongoose.model('roundTrip', roundTripSchema);

module.exports = RoundTrip;