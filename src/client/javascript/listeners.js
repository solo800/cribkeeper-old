// jshint esversion: 6
const fn = require('./functions')();

module.exports = function () {
    $(document).ready(() => {
        $('body').on('click touch', '.phaseNav > button', fn.changePhase);

        $('body').on('click touch', '.phase > button', fn.score);
    });
};
