const {Art} = require('./Schema.js');


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