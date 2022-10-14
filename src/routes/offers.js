const router = require('express').Router();
const {
    functionTemplate
} = require('../entities/offers')

router.route('/')
      .get(functionTemplate);

module.exports = router;