const router = require('express').Router();

const {
    sendCode,
    createUser,
    logIn,
    userType,
    applyToOferta,
    changeStatus,
    checkCode,
    changePassword
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


router.route('/auth/send-code-forgot')
      .post(sendCode);

router.route('/auth/check-code-forgot')
      .post(checkCode);

router.route('/auth/retrieve-password')
      .post(changePassword);

module.exports = router;