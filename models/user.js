const mongoose = require('mongoose'),
    validator = require('validator'),
    jwt = require('jsonwebtoken' );

let userSchema = new mongoose.Schema({
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
});

userSchema.methods.toJSON = function(){
    var user = this;
    var userObject = user.toObject();

    return {
        _id: user._id,
        email: user.email
    }
}

userSchema.methods.generateAuthToken = function(){
    var user = this;
    var access = 'auth';
    var token = jwt.sign({_id: user._id.toHexString(), access}, 'aabbcc').toString();
    user.tokens = user.tokens.concat([{access, token}]);

    return user.save().then(() => {
        return token;
    });
}

module.exports = mongoose.model('User', userSchema);