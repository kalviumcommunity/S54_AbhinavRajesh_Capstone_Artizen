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

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    pfp: {
        type: String,
        required: true,
    }
})

const testimonialSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    testimonial: {
        type: String,
        required: true,
    },
    likes: {
        type: Number,
        required: true,
    }
})


const Art = mongoose.model("artworks", artworkSchema);
const User = mongoose.model("userdatas", userSchema);
const Testimonial = mongoose.model("testimonialdatas", testimonialSchema);
module.exports = {Art, User, Testimonial};