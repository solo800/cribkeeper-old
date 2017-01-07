// jshint esversion: 6
module.exports = function ckAuth (req, res, next) {
    "use strict";
    console.log('in middleware', req.cookies);
    next();
};