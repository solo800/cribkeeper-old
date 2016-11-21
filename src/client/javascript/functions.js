// jshint esversion: 6
module.exports = function () {
    let lastScore = {
        playerOne: null,
        playerTwo: null
    };
    // Public
    function changePhase () {
        "use strict";
        let activeClass = 'active';

        // Only do something if this is not the active phase
        if (!$(this).hasClass(activeClass)) {
            // Get the current phase name
            let phaseName = $(this).text().toLowerCase();

            // Remove the active classes from the nav buttons and scoring containers
            $('.phaseNav button').removeClass(activeClass);
            $(this).closest('.phaseNav').siblings('.phase').removeClass(activeClass);

            // Add the active class to the button that was clicked
            $(this).addClass(activeClass);

            // And the scoring container that has the correct data-phase
            $(this).closest('.phaseNav').siblings(`.phase[data-phase="${phaseName}"]`).addClass(activeClass);
        }
    }
    // Public
    function score () {
        "use strict";
        let $this = this,
            scoreText = $($this).text(),
            player = $($this).closest('.phase').parent('div').attr('id'),
            score = getScoreValue($this);

        updateActivePhase($this);

        console.log(lastScore, player, scoreText, score);

        if (lastScore[player] === scoreText) {
            score = 1;
        }

        if ('run' === scoreText) {
            lastScore[player] = scoreText;

            window.setTimeout(function () {
                console.log('clearing', lastScore[player]);
                lastScore[player] = null;
            }, 1000);
        }

        incrementPlayerScore(player, score);
    }
    // Private
    function incrementPlayerScore(player, score) {
        "use strict";
        $(`#${player}Score`).text(parseInt($(`#${player}Score`).text()) + parseInt(score));
    }
    // Private
    function updateActivePhase (element) {
        "use strict";
        let activeClass = 'active';

        if (!$(element).closest('.phase').hasClass(activeClass)) {
            $(element).closest('.phase').siblings('div').removeClass(activeClass);
            $(element).closest('.phase').addClass(activeClass);
        }
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

        let score;

        _.each(scoreMap, function (scoreArr, value) {
            if (-1 < scoreArr.indexOf($(element).text())) {
                score = value;
            }
        });

        return score;
    }

    return {
        changePhase: changePhase,
        score: score
    };
};
