// jshint esversion: 6
const rootRouter = require('./rootRouter')(),
    gameRouter = require('./gameRouter')(),
    authRouter = require('./authRouter')(),
    templateRouter = require('./templateRouter')();

module.exports = function (app) {
    app.use('/', rootRouter);
    app.use('/game', gameRouter);
    app.use('/auth', authRouter);
    app.use('/templates', templateRouter);
};
