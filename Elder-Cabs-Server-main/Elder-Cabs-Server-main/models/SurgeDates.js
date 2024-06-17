const { default: mongoose } = require("mongoose");

const surgeDatesSchema = new mongoose.Schema({
    dates: {
        type: [String],
        required: [true, 'Dates is required']
    }
});

const SurgeDates = mongoose.model('surgeDates', surgeDatesSchema);

module.exports = SurgeDates;