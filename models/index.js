const Mongoose = require('mongoose');
Mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/TodoApp");

Mongoose.Promise = Promise;

module.exports.User = require('./user');
module.exports.Todo = require('./todo');