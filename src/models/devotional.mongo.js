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

module.exports ={
   devotionalDatabase: mongoose.model("Devotional", devotionalSchema),
   savedDevotionalsDatabase: mongoose.model("savedDevotionals", devotionalSchema),
};