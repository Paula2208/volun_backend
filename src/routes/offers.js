const router = require('express').Router();

const {
    createOferta
} = require('../entities/offers')



router.route('/offers')
      .post(createOferta);      

module.exports = router;