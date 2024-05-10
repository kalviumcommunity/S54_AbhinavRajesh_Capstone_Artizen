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
    },
    likedforum: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'forumsdatas'
    }],
    likedartworks: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'artworks'
    }]
});

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
    },
    author: {
        type: String,
        required: true,
    }
})


const replySchema = new mongoose.Schema({
    content: {
        type: String,
        required: true,
    },
    author: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now
    }
});

const forumSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        maxlength: 100
    },
    question: {
        type: String,
        required: true,
    },
    author: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now
    },
    likes: {
        type: Number,
        default: 0
    },
    replies: [replySchema]
});

forumSchema.index({ author: 1 });


const Art = mongoose.model("artworks", artworkSchema);
const User = mongoose.model("userdatas", userSchema);
const Testimonial = mongoose.model("testimonialdatas", testimonialSchema);
const Forums = mongoose.model("forumsdatas", forumSchema);

module.exports = {Art, User, Testimonial, Forums};