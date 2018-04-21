const express = require('express'),
    router = express.Router(),
    db = require('../models/'),
    helpers = require('../helpers/todos'),
    auth = require('../middleware/auth');
    

router.route('/')
    .get(auth, helpers.getTodos)
    .post(auth, helpers.createTodo)

router.route('/:todoId')
    .get(auth, helpers.getTodo)
    .put(auth, helpers.updateTodo)
    .delete(auth, helpers.deleteTodo)

module.exports = router;