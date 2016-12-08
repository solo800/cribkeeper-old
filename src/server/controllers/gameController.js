// jshint esversion: 6
const Game = require('../models/gameModel');

exports.create = function (req, res) {
    "use strict";
    console.log('in controller');
    const playerOneName = req.params.playerOneName,
        playerTwoName = req.params.playerTwoName;

    if ('[object String]' === Object.prototype.toString.call(playerOneName)
        && '[object String]' === Object.prototype.toString.call(playerTwoName)) {

        const game = new Game({
            playerOneName: playerOneName,
            playerTwoName: playerTwoName
        });
        game.save();
    }
};