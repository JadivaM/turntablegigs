const router = require('express').Router(),
  {
    createProfile,
    deleteProfile,
    updateProfile,
    uploadPhotos
  } = require('../../controllers/profiles');

router.post('/', createProfile);
router.delete('/delete', deleteProfile);
router.patch('/update', updateProfile);
router.post('/photos', uploadPhotos);
module.exports = router;
