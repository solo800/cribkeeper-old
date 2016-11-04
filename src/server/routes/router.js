// jshint esversion: 6
const rootRouter = require('./rootRouter')();
// const authRouter = require('./authRouter')();

module.exports = function (app) {
    // Root
    app.use('/', rootRouter);
    // app.use('/auth', authRouter);
};
