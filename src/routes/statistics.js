const router = require('express').Router();
const {
    getNumberOfPosts, getNumberOfUserType
} = require('../entities/statistics')

router.route('/statistics/getNumberOfPosts')
      .get(getNumberOfPosts);

router.route('/statistics/getNumberOfUserType')
      .get(getNumberOfUserType);      

module.exports = router;