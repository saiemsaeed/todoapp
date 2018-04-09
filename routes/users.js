const express = require('express'),
    router = express.Router(),
    db = require('../models/');

router.get('/', (req, res) => {
    db.User.find()
    .then(data => res.send(data))
    .catch(err => console.log(err));
});

router.post('/', (req, res) => {
    db.User.create({
        email: req.body.email,
        password: req.body.password
    })
    .then(data => res.json(data))
    .catch(err => res.send(err))
});

module.exports = router;