const router = require('express').Router();

const {
    createOferta,
    deleteOferta,
    getOfertas
} = require('../entities/offers')



router.route('/offers/create')
      .post(createOferta);
      
router.route('/offers/delete')
      .post(deleteOferta);  

router.route('/offers/get')
      .get(getOfertas);      

module.exports = router;