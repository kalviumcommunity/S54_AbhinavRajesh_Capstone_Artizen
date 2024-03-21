const express = require('express');
const router = express.Router();
const handlers = require('./handlers');

router.get('/artworks', handlers.getAllArtworks);
router.get('/artworks/:id', handlers.getArtworkById);
router.post('/artworks', handlers.createArtwork);
router.put('/artworks/:id', handlers.updateArtwork);
router.delete('/artworks/:id', handlers.deleteArtwork);

module.exports = router;
