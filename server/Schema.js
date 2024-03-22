const mongoose = require('mongoose');

const artworkSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true,
        index: true,
    },
    image: {
        type: String,
        required: true
    }
});

const Art = mongoose.model("artworks", artworkSchema);

module.exports = Art;