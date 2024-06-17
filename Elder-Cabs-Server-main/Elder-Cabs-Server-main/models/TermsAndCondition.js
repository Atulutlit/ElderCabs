const mongoose = require('mongoose');

const termsAndConditionSchema = new mongoose.Schema({
    type: {
        type: String,
        enum: ['onewayTrip', 'roundTrip', 'localTrip', 'transferTrip'],
        required: [true, 'terms and condition type is required, type should be onewayTrip, roundTrip, localTrip, transferTrip']
    },
    contents: {
        type: [String],
        required: [true, 'terms and conditions is required']
    },
}, { timestamps: true });

const TermsAndCondition = mongoose.model('termsAndCondition', termsAndConditionSchema);

module.exports = TermsAndCondition;