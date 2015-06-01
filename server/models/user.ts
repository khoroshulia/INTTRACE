///<reference path="../typings/tsd.d.ts"/>

import crypto = require('crypto');
import mongoose = require('./_mongoose');

interface IUser extends mongoose.Document {
    username: string;
    hashedPassword: string;
    salt: string;
    email: string;
    created: Date;
    firstName: string;
    lastName: string;
}

interface IUserSchemaMethods {
    encryptPassword(password: string): string;
    checkPassword(password: string): boolean;
}

interface IUserSchema extends mongoose.Schema{
    methods: IUserSchemaMethods;
}

var User: any = new mongoose.Schema({
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

User.methods.encryptPassword = function (password: string) {
    return crypto.createHmac('sha1', this.salt).update(password).digest('hex');
};


User.virtual('password')
    .set(function (password: string) {
        this._plainPassword = password;
        this.salt = String(Math.random());
        this.hashedPassword = this.encryptPassword(password);
    })
    .get(function () {
        return this._plainPassword;
    });


User.methods.checkPassword = function (password: string) {
    return this.encryptPassword(password) === this.hashedPassword;
};

var toExport = {
    UserSchema: User,
    User: mongoose.model<IUser>('User', User)
};

export = toExport;