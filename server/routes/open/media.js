const router = require('express').Router(),
  { getAllMedia, getSpecificMedia } = require('../../controllers/media');

router.get('/', getAllMedia);
router.get('/:id', getSpecificMedia);

module.exports = router;
