// jshint esversion: 6
const _ = require('underscore');

module.exports = function () {
    "use strict";
    /*
     * setCookie
     *
     * @arg req (node request object)
     * @arg res (node response object)
     *
     * @return boolean (true = cookie successfully set, false = cookie not set)
     * */
    function setCookie (req, res) {
        const cookies = req.cookies;

        let user,
            userCookie,
            signedIn = false;

        if ('undefined' !== typeof req.user) {
            user = req.user;
        } else {
            return false;
        }

        _.forEach(cookies, function (value, key) {
            if (user._id === key) {
                signedIn = true;
            }
        });

        if (false === signedIn) {
            res.cookie(user._id, user.formatUserCookie());
            return true;
        }

        return false;
    }

    return {
        setCookie: setCookie
        // getSignedInUsers: getSignedInUsers
    };
};