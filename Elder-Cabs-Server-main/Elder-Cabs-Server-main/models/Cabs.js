const mongoose = require('mongoose');

const cabsSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Cab name is required']
    },
    type: {
        type: String,
        required: [true, 'Cab type is required']
    },
    image: {
        type: String,
        required: true,
    },
    seat: {
        type: Number,
        required: true,
    },
    bag: {
        type: Number,
        required: true,
    },
    ac: {
        type: Boolean,
        default: false
    },
}, { timestamps: true });

const Cabs = mongoose.model('cabs', cabsSchema);

module.exports = Cabs;