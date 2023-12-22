var express = require('express');
var router = express.Router();

const artistController = require("../controllers/artistController");
const albumController = require("../controllers/albumController");
const genreController = require("../controllers/genreController");


router.get('/',albumController.album_list);
router.get('/artist',artistController.artist_list);
router.get('/artist/:id',artistController.artist_detail);
router.get('/genre',genreController.genre_list);
router.get('/genre/:id',genreController.genre_detail);
router.get('/:id',albumController.album_detail);




module.exports= router;