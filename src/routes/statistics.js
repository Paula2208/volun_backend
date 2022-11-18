const router = require('express').Router();
const {
    functionTemplate, getNumberOfPosts, getNumberOfNonProfits
} = require('../entities/statistics')

router.route('/getNumberOfPosts')
      .get(getNumberOfPosts);

router.route('/getNumberOfNonProfits')
      .get(getNumberOfNonProfits);      

module.exports = router;