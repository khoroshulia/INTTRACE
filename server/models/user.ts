///<reference path="../typings/tsd.d.ts"/>

import crypto = require('crypto');
import mongoose = require('./_mongoose');

var Schema = mongoose.Schema;

var User: mongoose.Schema = new Schema({
    username: {
        type: String,
        unique: true,
        required: true
    },
    hashedPassword: {
        type: String,
        required: true
    },
    salt: {
        type: String,
        required: true
    },
    email: {
        required: true,
        type: String
    },
    created: {
        type: Date,
        'default': Date.now
    },

    firstName: String,
    lastName: String
});

interface IUser extends mongoose.Document {
    username: string;
    hashedPassword: string;
    salt: string;
    email: string;
    created: Date;
    firstName: string;
    lastName: string;
}


//User.methods.encryptPassword = function (password) {
User.methods.encryptPassword = function (password) {
    return crypto.createHmac('sha1', this.salt).update(password).digest('hex');
};


User.virtual('password')
    .set(function (password) {
        this._plainPassword = password;
        this.salt = Math.random() + '';
        this.hashedPassword = this.encryptPassword(password);
    })
    .get(function () {
        return this._plainPassword;
    });


User.methods.checkPassword = function (password) {
    return this.encryptPassword(password) === this.hashedPassword;
};

var toExport = {
    UserSchema: User,
    User: mongoose.model<IUser>('User', User)
};

export = toExport;