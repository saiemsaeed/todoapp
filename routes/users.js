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

let auth = (req, res, next) => {
    let token = req.header('x-auth');

    db.User.findByToken(token)
    .then(user => {
        if(!user){
            return Promise.reject('Úser Not Authed! You are playing with us seriosly?');
        }
        req.user = user;
        req.token = token;
        next();
    })
    .catch((err) => res.status(401).send(err))
};

router.post('/me', auth, (req, res) => {
    res.send(req.user);
});

module.exports = router;