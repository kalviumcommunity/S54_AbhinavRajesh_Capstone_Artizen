const Art = require('./Schema');

exports.getAllArtworks = async (req, res) => {
    try {
        const artworks = await Art.find();
        res.json(artworks);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

