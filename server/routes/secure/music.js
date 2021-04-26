const router = require('express').Router(),
  {
    createMusic,
    updateMusic,
    deleteMusic
  } = require('../../controllers/music');

router.post('/upload', createMusic);
router.patch('/update', updateMusic);
router.delete('/', deleteMusic);

module.exports = router;
