const router = require('express').Router();

const {
    forgotPassword,
    createUser,
    sendCodeNumber,
    sendMail,
    logIn
} = require('../entities/auth')

router.route('/auth')
      .post(logIn);

router.route('/auth/user')
      .post(createUser);


router.route('/auth/forgotPassword')
      .post(forgotPassword);
/*
router.route('/auth/forgotPassword')
      .post(changePassword);
*/
module.exports = router;