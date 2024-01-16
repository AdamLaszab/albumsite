var express = require('express');
var router = express.Router();

const artistController = require("../controllers/artistController");
const albumController = require("../controllers/albumController");
const genreController = require("../controllers/genreController");


router.get('/',albumController.album_list);

router.get('/artist/add',artistController.artist_add_get);
router.post('/artist/add',artistController.artist_add_post);
router.get('/artist',artistController.artist_list);
router.get('/artist/:id',artistController.artist_detail);

router.get('/genre/add',genreController.genre_add_get);
router.post('/genre/add',genreController.genre_add_post);
router.get('/genre',genreController.genre_list);
router.get('/genre/:id',genreController.genre_detail);

// SEM MUSI IST /add
router.get('/add',albumController.album_add_get);
router.post('/add',albumController.album_add_post); 
router.get('/:id',albumController.album_detail);



module.exports= router;