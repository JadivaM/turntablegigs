const router = require('express').Router(),
  {
    uploadMedia,
    updateMedia,
    deleteMedia
  } = require('../../controllers/media');

router.post('/upload', uploadMedia);
router.patch('/update', updateMedia);
router.delete('/', deleteMedia);

module.exports = router;
