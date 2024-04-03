const {Art, Testimonial} = require('./Schema.js');
const {User} = require('./Schema.js')

const Webhook = require('svix')

exports.getAllArtworks = async (req, res) => {
    try {
        const artworks = await Art.find();
        //  console.log(artworks)
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

exports.getAllUsers = async (req,res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

exports.addNewUser = async (req,res) => {
    const users = new User({
        username: req.body.username,
        pfp: req.body.pfp
    });
    try {
        const newUser = await users.save();
        res.json(newUser);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

exports.getAllTestimonials = async (req,res) => {
    try {
        const testimonials = await Testimonial.find();
        res.json(testimonials);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

exports.createTestimonial = async (req,res) => {
    const testimonials = new Testimonial({
        title: req.body.title,
        testimonial: req.body.testimonial,
        likes: req.body.likes,
    });
    try {
        const newTestimonial = await testimonials.save();
        res.json(newTestimonial);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

exports.handleWebhook = async (req,res) => {
    try{
        const payloadString = req.body.toString();
        const svixHeaders = req.headers;

        const wh = new Webhook(process.env.CLERK_WEBHOOK_SECRET_KEY);
        const evt = wh.verify(payloadString, svixHeaders);

        const {id, ...attributes } = evt.data;

        const eventType = evt.type;

        if(eventType === 'user.created'){
            const username = attributes.first_name;
            const pfp = attributes.image_url;
        
            const user = new User({
                username: username,
                pfp: pfp,
            })
            await user.save();
            console.log('User is created')
        }


        res.status(200).json({
            success:true,
            message: 'Webhook recieved',
        })

    }catch(err){
        res.status(400).json({
            success: false,
            message: err.message,
        })
    }
}