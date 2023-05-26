const express = require('express');

const {
  readAllAlbums,
  readSingleAlbum,
  replaceAlbum,
  updateAlbum,
  deleteAlbum,
} = require('../controllers/album');

const router = express.Router();

router.route('/').get(readAllAlbums);

router.route('/:id').get(readSingleAlbum);

router.route('/:id').put(replaceAlbum);

router.route('/:id').patch(updateAlbum);

router.route('/:id').delete(deleteAlbum);

module.exports = router;
