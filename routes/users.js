const express = require('express'),
    router = express.Router(),
    db = require('../models/');

router.get('/', (req, res) => {
    db.User.find()
    .then(data => res.send(data))
    .catch(err => console.log(err));
});

router.post('/', (req, res) => {
    var body = {
        email: req.body.email,
        password: req.body.password
    }
    
    let user = new db.User(body);
    db.User.create(user)
    .then(() => {
        return user.generateAuthToken();
    })
    .then((token) => {
        res.header('x-auth', token).send(user);
    }) 
    .catch(err => res.send(err))
});

module.exports = router;