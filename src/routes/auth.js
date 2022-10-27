const express = require('express');
const router = require('express').Router();

const pool = require('../database');

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