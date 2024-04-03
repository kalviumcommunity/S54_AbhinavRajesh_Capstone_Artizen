const express = require('express');
const router = express.Router();
const handlers = require('./handlers');
const bodyParser = require('body-parser')

router.get('/data/artworks', handlers.getAllArtworks);
router.get('/artworks/:id', handlers.getArtworkById);
router.post('/artworks', handlers.createArtwork);
router.put('/artworks/:id', handlers.updateArtwork);
router.delete('/artworks/:id', handlers.deleteArtwork);
router.get('/users', handlers.getAllUsers);
router.post('/signup', handlers.addNewUser);
router.get('/testimonials', handlers.getAllTestimonials)
router.post('/testimonials', handlers.createTestimonial)

module.exports = router;
