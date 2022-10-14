const router = require('express').Router();
const {
    functionTemplate
} = require('../entities/reports')

router.route('/')
      .get(functionTemplate);

module.exports = router;