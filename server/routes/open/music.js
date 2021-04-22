const router = require('express').Router(),
  { getSpecificMusic, getAllMusic } = require('../../controllers/profiles');

router.get('/:id', getSpecificMusic);
router.get('/', getAllMusic);

module.exports = router;
