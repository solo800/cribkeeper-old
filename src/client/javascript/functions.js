// jshint esversion: 6
module.exports = function () {
    function changePhase () {
        let phaseClass = `currentPhase`;

        if (!$(this).hasClass(phaseClass)) {
            let phaseName = $(this).children(`button`).attr(`data-phase`);

            $(`.phase > .${phaseClass}`).removeClass(phaseClass);
            $(this).addClass(phaseClass);

            $(`.phaseActions > .${phaseClass}`).removeClass(phaseClass);
            $(`.phaseActions > [data-phase="${phaseName}"]`).addClass(phaseClass);
        }
    }
    return {
        changePhase: changePhase
    };
};
