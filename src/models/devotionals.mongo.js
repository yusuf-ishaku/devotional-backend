const mongoose = require("mongoose");

const devotionalSchema = mongoose.Schema({
    date: {
        type: Date,
        required: true,
    },
    devotional: {
        type: String,
        required: true,
    }
})

module.exports = mongoose.model("Devotional", devotionalSchema);