const router = require('express').Router();
const {
    functionTemplate
} = require('../entities/reports')

router.route('/')
      .get(functionTemplate);

router.route('/postReports')
      .get(functionTemplate);

module.exports = router;