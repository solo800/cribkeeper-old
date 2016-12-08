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
            $(this).siblings('button').removeClass(activeClass);
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

        if ('Run' === lastScore[player] && 'Run' === scoreText) {
            score = 1;
        }

        lastScore[player] = scoreText;

        if ('Run' === scoreText) {
            window.setTimeout(function () {
                lastScore[player] = null;
            }, 1000);
        }

        incrementPlayerScore(player, score);

        // $.post('/game', function (response, msg, xhr) {
        //     console.log('res', response);
        //     console.log('msg', msg);
        //     console.log('jq', xhr);
        // });

        checkForWin();
    }
    // Private
    function checkForWin () {
        "use strict";
        const plOneScore = parseInt($('#playerOneScore').text()),
            plTwoScore = parseInt($('#playerTwoScore').text());

        if (120 <= plOneScore && 120 <= plTwoScore) {
            displayWin('Uh oh, that isn\'t possible!')
        } else if (120 <= plOneScore) {
            displayWin('Player one wins!');
        } else if (120 <= plTwoScore) {
            displayWin('Player two wins!');
        }
    }
    // Private display win
    function displayWin (msg) {
        "use strict";
        window.setTimeout(function () {
            alert(msg);
        }, 100);
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
    function openSignIn () {
        "use strict";
        $.get('templates/signInForm', function (res, msg, xhr) {
            if (200 === xhr.status) {
                $('#content').append(res);
                $('body').append(createElem({
                    tag: 'div',
                    id: 'screenDimmer'
                }));
                window.setTimeout(function () {
                    $('#screenDimmer').addClass('active');
                });
            } else {
                console.log(msg, xhr);
            }
        });
    }
    //Public
    /**
     * @var passedArgs Object
     * passedArgs.tag String
     * passedArgs.attrs Object
     * passedArgs.text String
     * passedArgs.id String
     * passedArgs.classes String
     **/
    function createElem (passedArgs = {}) {
        let defArgs = {
                tag: 'div',
                attrs: {},
                text: '',
                id: '',
                classes: ''
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
        if ('' !== args.classes) {
            elem.setAttribute('class', args.classes);
        }
        if ('' !== args.id) {
            elem.setAttribute('id', args.id);
        }

        return elem;
    }

    return {
        changePhase: changePhase,
        score: score,
        openSignIn: openSignIn,
        // changePlayerName: changePlayerName,
        // updatePlayerName: updatePlayerName,
        createElem: createElem
    };
};
