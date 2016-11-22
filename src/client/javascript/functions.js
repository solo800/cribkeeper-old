// jshint esversion: 6
module.exports = function () {
    let lastScore = {
        playerOne: null,
        playerTwo: null
    },
    updatingPlayerName = false;

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
        let activeClass = 'active',
            phaseContainer = $(element).closest('.phase'),
            navButtons = phaseContainer.siblings('.phaseNav').children('button'),
            dataPhase = phaseContainer.attr('data-phase');

        if (!phaseContainer.hasClass(activeClass)) {
            phaseContainer.siblings('div').removeClass(activeClass);
            phaseContainer.addClass(activeClass);
            navButtons.removeClass('active');

            navButtons.each(function (i, button) {
                if (button.innerHTML.toLowerCase() === dataPhase) {
                    $(button).addClass('active');
                }
            });
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
    // Public
    function changePlayerName () {
        "use strict";
        updatingPlayerName = true;
        let $this = this,
            input = createElem({
                tag: 'input',
                attrs: {
                    type: 'text',
                    placeholder: 'Your name here'
                }
            });

        $($this).replaceWith(input);
        $(input).focus();
    }
    //Private
    function createElem (passedArgs = {}) {
        let defArgs = {
                tag: 'div',
                attrs: {},
                text: ''
            },
            args = Object.assign({}, defArgs, passedArgs),
            elem = document.createElement(args.tag);

        _.each(args.attrs, function (val, attr) {
            "use strict";
            elem.setAttribute(attr, val);
        });

        if ('' !== args.text) {
            elem.innerHTML = args.text;
        }

        return elem;
    }
    // Public
    function updatePlayerName (event) {
        "use strict";
        window.setTimeout(function () {
            let clickTarget = event.target,
                isNotNameInput = true,
                isNotNameSpan = true,
                playerNameSelector = '.playerDetails input',
                player, playerName, playerElem;

            if ('INPUT' === clickTarget.tagName && 1 === $(clickTarget).parent('.playerDetails').length) {
                isNotNameInput = false;
            }
            if ('SPAN' === clickTarget.tagName && true === $(clickTarget).hasClass('playerName')) {
                isNotNameSpan = false;
            }

            if (true === updatingPlayerName && true === isNotNameInput) {
                ['#playerOne', '#playerTwo'].forEach(function (playerId) {
                    player = $(playerId);
                    if (1 === player.find(playerNameSelector).length && true === isNotNameSpan) {
                        playerName = player.find(playerNameSelector).val().trim();
                        player.find(playerNameSelector).replaceWith(createElem({
                            tag: 'span',
                            text: playerName
                        }));
                        player = [];
                        playerName = undefined;
                    }
                });
            }
        }, 100);
    }

    return {
        changePhase: changePhase,
        score: score,
        changePlayerName: changePlayerName,
        updatePlayerName: updatePlayerName
    };
};
