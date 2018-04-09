const mongoose = require('mongoose'),
    validator = require('validator');

let userSchema = mongoose.Schema({
    email: {
        type: String,
        require: "Email of user is required",
        trim: true,
        minlength: 1,
        unique: true,
        validate: {
            validator: (value) => validator.isEmail(value),
            message: "{VALUE} is not a valid email"
        }
    },
    password: {
        type: String,
        minlength: 6,
        required: "Password of user is required"
    },
    tokens: [{
        access: {
            type: String,
            required: true
        },
        token:{
            type: String,
            required: true
        }
    }]
})

module.exports = mongoose.model('User', userSchema);