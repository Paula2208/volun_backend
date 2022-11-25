const router = require('express').Router();

const {
    forgotPassword,
    createUser,
    sendCodeNumber,
    sendMail,
    logIn,
    userType,
    applyToOferta,
    changeStatus

} = require('../entities/auth')

router.route('/auth')
      .post(logIn);

router.route('/auth/:username')
      .get(userType);

router.route('/auth/apply')
      .post(applyToOferta);

router.route('/auth/apply')
      .put(changeStatus);   
      
router.route('/auth/user')
      .post(createUser);


router.route('/auth/forgotPassword')
      .post(forgotPassword);
/*
router.route('/auth/forgotPassword')
      .post(changePassword);
*/
module.exports = router;