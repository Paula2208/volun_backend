const router = require('express').Router();
const {
    functionTemplate, postReportsActive, postReportsPending, postReportsDenied
} = require('../entities/reports')

router.route('/')
      .get(functionTemplate);

router.route('/postReportsActive/:postId')
      .get(postReportsActive);

router.route('/postReportsPending/:postId')
      .get(postReportsPending);  
      
router.route('/postReportsDenied/:postId')
      .get(postReportsDenied);
module.exports = router;