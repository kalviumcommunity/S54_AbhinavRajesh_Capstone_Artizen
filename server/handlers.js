const { Art, Testimonial, Forums } = require('./Schema.js');
const { User } = require('./Schema.js');

exports.getAllArtworks = async (req, res) => {
    try {
        const { category } = req.query;
        let artworks;
        if (category) {
            artworks = await Art.find({ category });
        } else {
            artworks = await Art.find();
        }
        res.json(artworks);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.createArtwork = async (req, res) => {
    const artwork = new Art({
        title: req.body.title,
        description: req.body.description,
        category: req.body.category,
        author: req.body.author,
        image: req.body.image
    });

    try {
        const newArtwork = await artwork.save();
        res.json(newArtwork);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getArtworkById = async (req, res) => {
    try {
        const artwork = await Art.findById(req.params.id);
        if (artwork == null) {
            return res.status(404).json({ message: 'Artwork not found' });
        }
        res.json(artwork);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

exports.updateArtwork = async (req, res) => {
    const { title, description, category, author, image } = req.body;
    if (!title || !description || !category || !author || !image) {
        return res.status(400).json({ message: 'Missing required fields' });
    }

    try {
        const updatedArtwork = await Art.findByIdAndUpdate(req.params.id, req.body);
        if (updatedArtwork == null) {
            return res.status(404).json({ message: 'Artwork not found' });
        }
        res.status(200).json(updatedArtwork);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

exports.deleteArtwork = async (req, res) => {
    try {
        const deletedArtwork = await Art.findByIdAndDelete(req.params.id);
        if (deletedArtwork == null) {
            return res.status(404).json({ message: 'Artwork not found' });
        }
        res.json({ message: 'Artwork deleted' });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.addNewUser = async (req, res) => {
    const users = new User({
        username: req.body.fullName,
        pfp: req.body.imageUrl
    });
    console.log(users);
    try {
        const newUser = await users.save();
        res.json(newUser);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
};

exports.getAllTestimonials = async (req, res) => {
    try {
        const testimonials = await Testimonial.find();
        res.json(testimonials);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.createTestimonial = async (req, res) => {
    const testimonials = new Testimonial({
        title: req.body.title,
        testimonial: req.body.testimonial,
        likes: req.body.likes,
        author: req.body.author,
    });
    try {
        const newTestimonial = await testimonials.save();
        res.json(newTestimonial);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.updateTestimonial = async (req, res) => {
    const { title, testimonial, likes } = req.body;
    if (!title || !testimonial || !likes) {
        return res.status(400).json({ message: 'Missing required fields' });
    }

    try {
        const updatedTestimonial = await Testimonial.findByIdAndUpdate(req.params.id, req.body);
        if (updatedTestimonial == null) {
            return res.status(404).json({ message: 'Testimonial not found' });
        }
        res.status(200).json(updatedTestimonial);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

exports.deleteTestimonial = async (req, res) => {
    try {
        const deletedTestimonial = await Testimonial.findByIdAndDelete(req.params.id);
        if (deletedTestimonial == null) {
            return res.status(404).json({ message: 'Testimonial not found' });
        }
        res.json({ message: 'Testimonial deleted' });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

exports.getAllForums = async (req, res) => {
    try {
        const forums = await Forums.find();
        res.json(forums);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.createForums = async (req, res) => {
    const forum = new Forums({
        title: req.body.title,
        question: req.body.question,
        author: req.body.author,
        date: req.body.date,
        likes: req.body.likes
    });

    try {
        const newForum = await forum.save();
        res.json(newForum);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getAllReplies = async (req, res) => {
    try {
        const replies = await Forums.find({}, { replies: 1 });
        res.json(replies);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.createReplies = async (req, res) => {
    const { forumId } = req.params;
    const { content, author, date } = req.body;
    try {
        const forum = await Forums.findById(forumId);
        if (!forum) {
            return res.status(404).json({ message: 'Forum not found' });
        }
        forum.replies.push({ content, author, date });
        const updatedForum = await forum.save();
        res.status(201).json(updatedForum.replies);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
