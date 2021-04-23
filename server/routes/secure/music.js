const router = require('express').Router(),
  {
    createMusic,
    updateMusic,
    deleteMusic,
    uploadCoverPhoto
  } = require('../../controllers/music');

router.post('/upload', createMusic);
router.patch('/update', updateMusic);
router.delete('/', deleteMusic);
router.post('/upload/photo', uploadCoverPhoto);

module.exports = router;
