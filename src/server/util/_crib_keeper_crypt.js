// jshint esversion: 6
/*
 * The purpose of this module is to further abstract on bcrypt and thus simplify it's use and ultimately improve code readability
 */
const bcrypt = require('bcrypt');

module.exports = function () {
    "use strict";
    const hash = function (string) {
        return new Promise((resolve, reject) => {
            bcrypt.genSalt(10)
                .then((salt) => {
                    bcrypt.hash(string, salt)
                        .then((hash) => {
                            resolve(hash);
                        })
                        .catch((err) => {
                            reject(err);
                        });
                })
                .catch((err) => {
                    console.log('error generating salt', err);
                    reject(err);
                });
        });
    },
    compare = function (plainTextPass, hashedPass) {
        return new Promise((resolve, reject) => {
            bcrypt.compare(plainTextPass, hashedPass, (err, valid) => {
                if (!err && true === valid) {
                    resolve(true);
                } else {
                    reject(false);
                }
            });
        });
    };

    /** Old main function
    return new Promise((resolve, reject) => {
        if ('[object Boolean]' !== Object.prototype.toString.call(compare)) {
            isCompare = true;
        }
        if ('[object String]' !== Object.prototype.toString.call(string)) {
            reject("Cannot call CribKeeper's crypt module without passing a string to hash or compare");
        }
        if (true === isCompare) {
            compare(args[0], args[1])
                .then((valid) => {
                    resolve(valid);
                })
                .catch((invalid) => {
                    reject(invalid);
                });
        } else {
            hash(string)
                .then((hash) => {
                    resolve(hash);
                })
                .catch((err) => {
                    reject(err);
                });
        }
    });
    */

    return {
        hash: hash,
        compare: compare
    };
};