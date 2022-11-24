const router = require('express').Router();
const {
    functionTemplate, postReportsActive, postReportsPending, postReportsDenied
} = require('../entities/reports')

router.route('/')
      .get(functionTemplate);

router.route('/postReportsActive/:postId')
      .get(postReportsActive);

router.route('/postReportsPending')
      .get(postReportsPending);  
      
router.route('/postReportsDenied')
      .get(postReportsDenied);
module.exports = router;