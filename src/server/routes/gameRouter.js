// jshint esversion: 6
const express = require('express'),
    gameRouter = express.Router(),
    gameController = require('../controllers/gameController');

module.exports = function () {
    // Include services and controllers here
    // someService = require('../services/someService')(),
    // someController = require('../controllers/someController')(someService);

    gameRouter.route('/')
        .get(function (req, res) {
            "use strict";
            console.log('in get game router');
            res.sendStatus(200);
        });
    gameRouter.route('/new/:playerOneName?/:playerTwoName?')
        .post(function (req, res) {
            "use strict";
            console.log('in post game router');
            res.sendStatus(201);
            return gameController.create(req, res);
        });

    return gameRouter;
};
