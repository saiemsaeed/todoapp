const db = require('../models')
_ = require('lodash');

exports.getUsers = async (req, res) => {
    try {
        let users = await db.User.find();
        res.status(200).send(users);
    }
    catch (e) {
        res.status(400).send();
    }
};

exports.addUser = async (req, res) => {
    try {
        const body = _.pick(req.body, ['email', 'password']);
        const user = new db.User(body);
        const newUser = await db.User.create(user);
        const token = await user.generateAuthToken();
        res.status(201).header('x-auth', token).send(user);

    } catch (e) {
        res.status(400).send();
    }
};

exports.loginUser = async (req, res) => {
    try {
        const body = _.pick(req.body, ['email', 'password']);
        const user = await db.User.findByCredentials(body.email, body.password);
        const token = await user.generateAuthToken();
        res.status(200).header('x-auth', token).send();
    } catch (e) {
        res.status(404).send();
    }
}

exports.getMe = (req, res) => {
    res.send(req.user);
}

exports.logoutMe = async (req, res) => {
    try {
        await req.user.removeToken(req.token);
        res.status(200).send();
    } catch (e) {
        res.status(400).send();

    }
}

module.exports = exports;