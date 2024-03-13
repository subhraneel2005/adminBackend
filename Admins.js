const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/adminsDB");

const adminSchema = mongoose.Schema({
    _id: {
        type: String,
        default: () => Math.random().toString(36).substr(2,9)
    },
    title: String,
    description: String,
    price: Number,
    published: Boolean,
    thumbnail: String,
    video: String,
});

module.exports = mongoose.model("Adminss", adminSchema);