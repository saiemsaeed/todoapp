const db = require('../models/');
let auth = (req, res, next) => {
    let token = req.header('x-auth');

    db.User.findByToken(token)
        .then(user => {
            if (!user) {
                return Promise.reject('No user exists with this auth. You are playing with us seriosly?');
            }
            req.user = user;
            req.token = token;
            next();
        })
        .catch((err) => res.status(401).send(err))
};

module.exports = auth;