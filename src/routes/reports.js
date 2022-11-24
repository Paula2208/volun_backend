const router = require('express').Router();
const {
    functionTemplate,
    voluteersReport

} = require('../entities/reports')

router.route('/')
      .get(functionTemplate);

router.route('/reports')
      .get(voluteersReport);

module.exports = router;