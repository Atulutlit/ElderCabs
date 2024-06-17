const { default: mongoose } = require("mongoose");

const attachTaxiSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'name is required'],
    },
    email: {
        type: String,
        required: [true, 'email is required'],
    },
    phoneNo: {
        type: String,
        required: [true, 'phone is required'],
    },
    companyName: {
        type: String,
        required: [true, 'company name is required'],
    },
    state: {
        type: String,
        required: [true, 'state is required'],
    },
    city: {
        type: String,
        required: [true, 'city is required'],
    },
}, { timestamps: true });

const AttachTaxi = mongoose.model('attachTaxi', attachTaxiSchema);
module.exports = AttachTaxi;