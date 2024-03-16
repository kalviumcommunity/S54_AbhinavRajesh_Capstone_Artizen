const mongoose = require('mongoose');

const artworkSchema = new mongoose.Schema({
    Title: {
        type: String,
        required: true
    },
    Description: {
        type: String,
        required: true
    },
    Category: {
        type: String,
        required: true
    },
    Author: {
        type: String,
        required: true
    },
    Image: {
        type: String,
        required: true
    }
});

const Art = mongoose.model("artworks", artworkSchema);

module.exports = Art;

