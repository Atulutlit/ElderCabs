const mongoose = require('mongoose');

const categoriesSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'category name is required']
    }
}, { timestamps: true });

module.exports = mongoose.model('categories', categoriesSchema);