const express = require('express'),
    router = express.Router(),
    db = require('../models/');
    helper = require('../helpers/users'),
    auth = require('../middleware/auth');

router.route('/')
    // .get(helper.getUsers)
    .post(helper.addUser);

router.route('/login')
    .post(helper.loginUser);

router.route('/me')
    .get(auth, helper.getMe)

router.route('/me/logout')
    .delete(auth, helper.logoutMe);

module.exports = router;