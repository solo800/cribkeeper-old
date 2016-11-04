// jshint esversion: 6
const fn = require('./functions')();

module.exports = function () {
    $(document).ready(() => {
        $('body').on('click touch', '.phase > div', fn.changePhase);
    });
};
