exports.getAllArtworks = async (req, res) => {
    try {
        const artworks = await Art.find();
        res.json(artworks);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.createArtwork = async (req, res) => { 
        try {
            res.send("Posted Successfully");
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
        const updatedArtwork = await Art.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (updatedArtwork == null) {
            return res.status(404).json({ message: 'Artwork not found' });
        }
        res.json(updatedArtwork);
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
