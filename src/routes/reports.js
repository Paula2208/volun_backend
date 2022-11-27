const router = require('express').Router();
const {
    voluteersReport, postReportsActive, postReportsPending, postReportsDenied
} = require('../entities/reports')

router.route('/reports')
      .get(voluteersReport);

router.route('/reports/postReportsActive/:postId')
      .get(postReportsActive);

router.route('/reports/postReportsPending/:postId')
      .get(postReportsPending);  
      
router.route('/reports/postReportsDenied/:postId')
      .get(postReportsDenied);
module.exports = router;