const express = require('express');
const router = express.Router();
const handlers = require('./handlers');

router.get('/artworks', handlers.getAllArtworks);

module.exports = router;
