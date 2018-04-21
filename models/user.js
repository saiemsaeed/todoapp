const mongoose = require('mongoose'),
    validator = require('validator'),
    jwt = require('jsonwebtoken'),
    bCrypt = require('bcryptjs');

let userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: "Email of user is required",
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
        token: {
            type: String,
            required: true
        }
    }]
});

userSchema.methods.toJSON = function () {
    var user = this;
    var userObject = user.toObject();

    return {
        _id: user._id,
        email: user.email,
        // password: user.password
    }
}

userSchema.methods.generateAuthToken = function () {
    var user = this;
    var access = 'auth';
    var token = jwt.sign({ _id: user._id.toHexString(), access }, 'aabbcc', {expiresIn: '60d'}).toString();
    user.tokens = user.tokens.concat([{ access, token }]);

    return user.save().then(() => {
        return token;
    });
}

userSchema.methods.removeToken = function (token) {
    let user = this;

    return user.update({
        $pull: {
            tokens: { token }
        }
    })
}

userSchema.statics.findByCredentials = function (email, password) {
    var User = this;
    return User.findOne({ email }).then(user => {
        if (!user)
            return Promise.reject();

        return new Promise((resolve, reject) => {
            bCrypt.compare(password, user.password, (err, res) => {
                if (res)
                    resolve(user);
                else
                    reject();
            })
        })
    })
}

userSchema.statics.findByToken = function (token) {
    let User = this;
    let decoded;
    if(!token)
        return Promise.reject('No authentication exists.');
    try {
        decoded = jwt.verify(token, 'aabbcc');
    } catch (e) {
        return Promise.reject('Authentication Token is compromised!');
    }

    return User.findOne({
        _id: decoded._id,
        'tokens.token': token,
        'tokens.access': 'auth'
    })
}

userSchema.pre('save', function (next) {
    let user = this;
    if (user.isModified('password')) {
        bCrypt.genSalt(10, (err, salt) => {
            bCrypt.hash(user.password, salt, (err, hash) => {
                user.password = hash;
                next();
            })
        })
    } else {
        next();
    }
})

module.exports = mongoose.model('User', userSchema);