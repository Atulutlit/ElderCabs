const mongoose = require("mongoose");

const themeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    }
}, { timestamps: true });

const Theme = mongoose.model("theme", themeSchema);
module.exports = Theme;
