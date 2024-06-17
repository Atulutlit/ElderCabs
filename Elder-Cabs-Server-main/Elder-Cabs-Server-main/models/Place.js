const mongoose = require('mongoose');

const placeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'place name is required']
    }
}, { timestamps: true });

module.exports = mongoose.model('places', placeSchema);