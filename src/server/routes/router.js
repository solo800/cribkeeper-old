var rootRouter = require('./rootRouter')()

module.exports = function (app, passport) {
    // Root
    app.use('/', rootRouter);
};
