const router = require('express').Router();

const {
    createOferta,
    deleteOferta,
    getOfertas,
    updateOferta,
    getOfertasByCategory,
    getOrganizationList
} = require('../entities/offers')



router.route('/offers/create')
      .post(createOferta);
      
router.route('/offers/delete/:id')
      .delete(deleteOferta);  

router.route('/offers/get')
      .get(getOfertas);    

router.route('/offers/getOfertasByCategory/:category')
      .get(getOfertasByCategory);   
      
router.route('/offers/getOrganizationList')
      .get(getOrganizationList);  
      
router.route('/offers/update/:id')
      .put(updateOferta);          

module.exports = router;