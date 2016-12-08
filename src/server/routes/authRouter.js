// jshint esversion: 6
const express = require('express'),
    authRouter = express.Router();

module.exports = function () {
    // Include services and controllers here
    // someService = require('../services/someService')(),
    // someController = require('../controllers/someController')(someService);

    authRouter.route('/')
        .get(function (req, res) {
            res.send('in auth router');
        });

    return authRouter;
};
