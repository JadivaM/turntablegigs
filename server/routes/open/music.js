const router = require('express').Router(),
  { getSpecificMusic, getAllMusic } = require('../../controllers/music');

router.get('/:id', getSpecificMusic);
router.get('/', getAllMusic);

module.exports = router;
