const router = require('express').Router();
const {
    changePassword,
    createUser,
    sendCodeNumber,
    logIn
} = require('../entities/auth')

router.route('/auth')
      .get(logIn);

router.route('/auth/user')
      .post(createUser);

router.route('/auth/forgotPassword')
      .get(sendCodeNumber);

router.route('/auth/forgotPassword')
      .post(changePassword);

module.exports = router;