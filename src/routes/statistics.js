const router = require('express').Router();
const {
    functionTemplate
} = require('../entities/statistics')

router.route('/')
      .get(functionTemplate);

module.exports = router;