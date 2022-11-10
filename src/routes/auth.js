const router = require('express').Router();

const {
    changePassword,
    createUser,
    sendCodeNumber,
    logIn,
    userType

} = require('../entities/auth')

router.route('/auth')
      .post(logIn);

router.route('/auth')
      .get(userType);

router.route('/auth/user')
      .post(createUser);

router.route('/auth/forgotPassword')
      .get(sendCodeNumber);

router.route('/auth/forgotPassword')
      .post(changePassword);

module.exports = router;