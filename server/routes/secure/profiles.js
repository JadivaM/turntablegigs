const router = require('express').Router(),
  {
    createProfile,
    deleteProfile,
    updateProfile,
    uploadCoverPhoto
  } = require('../../controllers/profiles');

router.post('/', createProfile);
router.delete('/delete', deleteProfile);
router.patch('/update', updateProfile);
router.post('/upload/coverphoto', uploadCoverPhoto);

module.exports = router;
