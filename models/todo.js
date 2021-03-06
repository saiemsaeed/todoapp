const mongoose = require('mongoose');

var todoSchema = new mongoose.Schema({
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
    },
    _creator: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    }
});



var Todo = mongoose.model('Todo', todoSchema);

module.exports = Todo;