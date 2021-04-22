const router = require('express').Router(),
  {
    createMusic,
    updateMusic,
    deleteMusic,
    uploadCoverPhoto
  } = require('../../controllers/profiles');

router.post('/:id', createMusic);
router.patch('/update', updateMusic);
router.delete('/', deleteMusic);
router.post('/uploadphoto', uploadCoverPhoto);

module.exports = router;
