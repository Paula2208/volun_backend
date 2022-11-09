const router = require('express').Router();

const {
    createOferta,
    deleteOferta,
    getOfertas,
    updateOferta
} = require('../entities/offers')



router.route('/offers/create')
      .post(createOferta);
      
router.route('/offers/delete')
      .delete(deleteOferta);  

router.route('/offers/get')
      .get(getOfertas);    
      
router.route('/offers/update')
      .put(updateOferta);          

module.exports = router;