const express = require('express');

const {
  createArtist,
  readAllArtists,
  readSingleArtist,
  replaceArtist,
  updateArtist,
  deleteArtist,
} = require('../controllers/artist');

const { createAlbum } = require('../controllers/album');

const router = express.Router();

router.route('/').post(createArtist);

router.route('/').get(readAllArtists);

router.route('/:id').get(readSingleArtist);

router.route('/:id').put(replaceArtist);

router.route('/:id').patch(updateArtist);

router.route('/:id').delete(deleteArtist);

router.route('/:id/albums').post(createAlbum);

module.exports = router;
