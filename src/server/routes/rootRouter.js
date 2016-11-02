const express = require('express');
const rootRouter = express.Router();

module.exports = function () {
    // Include services and controllers here
    // someService = require('../services/someService')(),
    // someController = require('../controllers/someController')(someService);

    rootRouter.route('/')
        .get(function (req, res) {
            res.render('index');
        });

    return rootRouter;
};
