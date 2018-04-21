const db = require('../models')
    _ = require('lodash');

exports.getUsers = (req, res) => {
    db.User.find()
    .then(data => res.send(data))
    .catch(err => console.log(err));
};

exports.addUser = (req, res) => {
    var body = _.pick(req.body, ['email', 'password']);
    let user = new db.User(body);

    db.User.create(user)
    .then(() => {
        return user.generateAuthToken();
    })
    .then(token => {
        res.status(201).header('x-auth', token).send(user);
    }) 
    .catch(err => res.send(err))
};

exports.loginUser = (req, res) => {
    let body = _.pick(req.body, ['email', 'password']);
    db.User.findByCredentials(body.email, body.password)
    .then((user) => {
        return user.generateAuthToken();
    })
    .then(token => {
        res.status(200).header('x-auth', token).send(user);
    })
    .catch(err => res.status(404).send())
}

exports.getMe = (req, res) => {
    res.send(req.user);
}

exports.logoutMe = (req, res) => {
    req.user.removeToken(req.token)
    .then(() => {
        res.status(200).send();
    })
    .catch(() => {
        res.status(400).send();
    })
}

module.exports = exports;