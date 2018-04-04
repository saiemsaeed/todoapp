const Mongoose = require('mongoose');

var todoSchema = Mongoose.Schema({
    text: {
        type: String,
        required: "Todo Text is Required!"
    },
    createdOn:{
        type: Date,
        default: Date.now
    },
    isCompleted: {
        type: Boolean,
        default: false
    },
    completedOn: {
        type: Date,
        default: null
    }
});

var Todo = Mongoose.model('Todo', todoSchema);

module.exports = Todo;