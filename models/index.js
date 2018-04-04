const Mongoose = require('mongoose');
Mongoose.connect("mongodb://localhost:27017/TodoApp");

Mongoose.Promise = Promise;

module.exports.Todo = require('./todo');