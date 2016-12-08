// jshint esversion: 6
const fn = require('./functions')(),
    undoRedo = require('./_undo_redo.js')();

module.exports = function () {
    const actions = 'click touch';

    $(document).ready(() => {
        $('body').on(actions, '.phaseNav > button', fn.changePhase);

        $('body').on(actions, '.phase > button', fn.score);
        $('body').on(actions, '.phase > button', undoRedo.recordAction);

        $('body').on(actions, '.playerName', fn.openSignIn);

        // $('body').on(actions, '#content', fn.updatePlayerName);
        
        $('body').on(actions, '.permanents > .undoRedo', undoRedo.undoRedo);
    });
};
