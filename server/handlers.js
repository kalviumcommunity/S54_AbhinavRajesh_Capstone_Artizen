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
        
        res.send("Successfuly found by ID")
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

exports.updateArtwork = async (req, res) => {
    try {
        res.send("Artwork Updated Successfuly")
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

exports.deleteArtwork = async (req, res) => {
    try {
        res.send("Artwork Deleted Successfuly")
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}