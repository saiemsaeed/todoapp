const db = require('../models');

exports.getTodos = async (req, res) => {
    try {
        const todos = await db.Todo.find({ _creator: req.user._id });
        res.status(200).json(todos);
    } catch (e) {
        res.status(404).send(e);
    }
};

exports.createTodo = async (req, res) => {
    try {
        const newTodo = await db.Todo.create({
            text: req.body.text,
            _creator: req.user._id
        });
        res.status(201).send(newTodo);
    } catch (e) {
        res.status(400).send(e);
    }
};


exports.getTodo = async (req, res) => {
    try {
        let _id = req.params.todoId;
        const todo = await db.Todo.findOne({ _id, _creator: req.user._id });
        res.status(200).json(todo);
    } catch (e) {
        res.status(404).send(err);
    }
};

exports.updateTodo = async (req, res) => {
    try {
        const _id = req.params.todoId;
        const todo = await db.Todo.findOneAndUpdate({ _id, _creator: req.user._id }, req.body, { new: true });
        res.status(200).send(todo);
    } catch (e) {
        res.status(404).send(e);
    }
};

exports.deleteTodo = async(req, res) => {
    try {
        let _id = req.params.todoId;
        const removedTodo = await db.Todo.findOneAndRemove({ _id, _creator: req.user._id });
        res.status(200).send(removedTodo);        
    } catch (e) {
        res.status(404).send(e);        
    }
};

module.exports = exports;