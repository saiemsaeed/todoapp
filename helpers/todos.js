const db = require('../models');

exports.getTodos = (req, res) => {
    db.Todo.find({
        _creator: req.user._id
    })
    .then((data) => {
        res.json(data);
    })
    .catch((err) => {
        res.status(404).send(err);
    })
};

exports.createTodo = (req, res) => {
    db.Todo.create({
        text: req.body.text,
        _creator: req.user._id
    })
    .then((data) => {
        res.status(201).send(data);
    })
    .catch((err) => {
        res.status(400).send(err);
    })
};


exports.getTodo = (req, res) => {
    let id = req.params.todoId;
    db.Todo.findOne({id, _creator: req.user._id})
    .then((data) => {
        res.json(data);
    })
    .catch((err) => {
        res.send(err);
    });
};

exports.updateTodo = (req, res) => {
    let id = req.params.todoId;
    db.Todo.findOneAndUpdate({_id, _creator: req.user._id}, req.body, {new: true})
    .then((data) => {
        res.status(200).send(data);
    })
    .catch((err) => {
        res.send(err);
    });
};

exports.deleteTodo = (req, res) => {
    let id = req.params.todoId;
    db.Todo.findOneAndRemove({id, _creator: req.user._id})
    .then((data) => {
        res.send(data);
    })
    .catch((err) => {
        res.status(404).send(err);
    });
};

module.exports = exports;