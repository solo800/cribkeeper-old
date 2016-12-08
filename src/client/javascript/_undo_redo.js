// jshint esversion: 6
const fn = require('./functions')();

module.exports = function () {
    "use strict";
    const actions = {
        playerOne: {
            lastActive: 0,
            scores: [{score: 0, type: 'start'}]
        },
        playerTwo: {
            lastActive: 0,
            scores: [{score: 0, type: 'start'}]
        },
        addAction: function (playerId, elem) {
            // Delete any actions that fall after the current last active action
            this[playerId].scores = this[playerId].scores.slice(0, this[playerId].lastActive + 1);

            let actionValue = getScoreValue(elem);

            this[playerId].scores.push({
                score: actionValue,
                type: elem.innerHTML
            });

            // Combine any runs
            this.consolidateScoreFeed(playerId);

            this[playerId].lastActive = this[playerId].scores.length - 1;
        },
        undo: function (playerId) {
            let scoreMod = this[playerId].scores[this[playerId].lastActive].score,
                score = parseInt($(`#${playerId}Score`).text());

            if (this[playerId].lastActive > 0) {
                this[playerId].lastActive--;
            }

            $(`#${playerId}Score`).text(score - scoreMod);
        },
        redo: function (playerId) {
            if ('undefined' === typeof this[playerId].scores[this[playerId].lastActive + 1].score) {
                return;
            }
            let scoreMod = this[playerId].scores[this[playerId].lastActive + 1].score,
                score = parseInt($(`#${playerId}Score`).text());

            if (this[playerId].lastActive < this[playerId].scores.length - 1) {
                this[playerId].lastActive++;
            }

            $(`#${playerId}Score`).text(score + scoreMod);
        },
        // Private
        // Traverse the score array combining run scores so they appear as their total
        // ie 3, 1, 1 should be 5
        consolidateScoreFeed: function (playerId) {
            let scoreFeed = [],
                lastScoreWasRun = false;

            actions[playerId].scores.forEach(function (score, i) {
                if ('Run' === score.type) {
                    if (true === lastScoreWasRun && 1 === score.score) {
                        scoreFeed[scoreFeed.length - 1].score++;
                    } else {
                        scoreFeed.push(score);
                    }
                    lastScoreWasRun = true;
                } else {
                    scoreFeed.push(score);
                    lastScoreWasRun = false;
                }
            });

            this[playerId].scores = scoreFeed;
        }
    },
    lastScore = {
        playerOne: null,
        playerTwo: null
    };

    // Public
    function undoRedo () {
        if (-1 < this.getAttribute('class').indexOf(' undo ')) {
            undo.call(this);
        } else if (-1 < this.getAttribute('class').indexOf(' redo ')) {
            redo.call(this);
        }

        let playerId = null !== this.closest('#playerOne') ? 'playerOne' : 'playerTw';

        updateScoreFeed(playerId);
    }
    // Public
    function undo () {
        const playerId = 'undefined' !== typeof $(this).closest('#playerOne') ? 'playerOne' : 'playerTwo';

        // Don't continue if the game has just started
        if (0 === actions[playerId].lastActive) {
            return;
        }

        actions.undo(playerId);
    }
    // Public
    function redo () {
        const playerId = 'undefined' !== typeof $(this).closest('#playerOne') ? 'playerOne' : 'playerTwo';

        // Don't continue if this is the latest action
        if (actions[playerId].lastActive + 1 === actions[playerId].scores.length) {
            return;
        }

        actions.redo(playerId);
    }
    // Public
    function recordAction () {
        "use strict";
        let playerId = null !== this.closest('#playerOne') ? 'playerOne' : 'playerTwo';

        actions.addAction(playerId, this);

        updateScoreFeed(playerId);
    }
    // Private
    function getScoreValue (element) {
        "use strict";
        const scoreMap = {
            1: ['Go'],
            2: ['His Heels', 'Pair', '15', '31'],
            3: ['Run'],
            6: ['Pairs Royal'],
            8: ['Double Run'],
            12: ['Pairs Double Royal']
        };

        let score,
            scoreText = element.innerHTML,
            playerId = 1 === $(element).closest('#playerOne').length ? 'playerOne' : 'playerTwo';

        if ('Run' === lastScore[playerId] && 'Run' === scoreText) {
            score = 1;
        } else {
            _.each(scoreMap, function (scoreArr, value) {
                if (-1 < scoreArr.indexOf($(element).text())) {
                    score = value;
                }
            });
        }

        if ('Run' === scoreText) {
            window.setTimeout(function () {
                lastScore[playerId] = null;
            }, 1000);

            lastScore[playerId] = scoreText;
        }

        return parseInt(score);
    }
    // Private
    /**
     * Grab sixteen elements from the player's scores and display them in order
     * If there were less than 16 just display from 0 to the end
     * If there are more then display the active score and previous 15
     **/
    function updateScoreFeed (playerId) {
        $(`#${playerId} .actionFeed`).html('');

        let elem,
            limit = actions[playerId].scores.length,
            scoreIndex = limit - 16;

        // Score index is below zero set it to zero
        if (0 > scoreIndex) {
            scoreIndex = 0;
        } else {
            // Score index was greater than zero so set the limit to be 16 more than index
            limit = scoreIndex + 16;
        }

        for (scoreIndex; scoreIndex < limit; scoreIndex++) {
            elem = fn.createElem({
                tag: 'span',
                text: actions[playerId].scores[scoreIndex].score,
                classes: scoreIndex === actions[playerId].lastActive ? 'active' : ''
            });

            $(`#${playerId} .actionFeed`).append(elem);
        }
    }

    // Init function
    (function () {
        updateScoreFeed('playerOne');
        updateScoreFeed('playerTwo');
    })();

    return {
        undoRedo: undoRedo,
        undo: undo,
        redo: redo,
        recordAction: recordAction
    };
};