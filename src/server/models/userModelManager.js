// jshint esversion: 6
const User = require('./userModel'),
    mongodb = require('mongodb').MongoClient,
    config = require('../../config/config')();

module.exports = function () {
    "use strict";
    let findUser = function (user) {
        return new Promise((resolve, reject) => {
            mongodb.connect(config.mongoUrl)
                .then((db) => {
                    // console.log('in then of db in mod manager');
                    db.collection('users').findOne({username: user.username})
                        .then((dbUser) => {
                            // console.log('then of model manager');
                            if (null !== dbUser) {
                                resolve(dbUser);
                            } else {
                                reject(null);
                            }
                        })
                        .catch((err) => {
                            reject(err);
                        });
                })
                .catch((err) => {
                    reject(err);
                });
        });
    };

    return {
        findUser: findUser
    };
};
