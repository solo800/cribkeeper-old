// jshint esversion: 6
const mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    ckCrypt = require('../util/_crib_keeper_crypt')(),
    mongodb = require('mongodb').MongoClient;

let UserSchema = new Schema({
    id: Number,
    username: String,
    password: String,
    createdOn: {type: Date, default: Date.now},
    lastModified: Date
});

UserSchema.methods.comparePassword = function (password) {
    "use strict";
    return new Promise((resolve, reject) => {
        ckCrypt.compare(password, this.password)
            .then(() => {
                // Then is only called if the password is valid so there's no need to pass arguments
                resolve();
            })
            .catch(() => {
                // Catch is only called if the password is NOT valid so there's no need to pass arguments
                reject();
            });
    });
};

UserSchema.methods.formatUserCookie = function () {
    "use strict";
    return {
        username: this.username,
        password: this.password
    };
};

module.exports = mongoose.model('User', UserSchema);