const router = require('express').Router();

const {
    createOferta,
    deleteOferta
} = require('../entities/offers')



router.route('/offers/create')
      .post(createOferta);
      
router.route('/offers/delete')
      .post(deleteOferta);  

module.exports = router;