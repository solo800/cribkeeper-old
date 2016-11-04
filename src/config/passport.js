var passport = require('passport');

var passAuth = function (app) {
    app.use(passport.initialize());
    app.use(passport.session());

    passport.serializeUser(function (user, cb) {
        cb(null, user);
    });

    passport.deserializeUser(function (user, cb) {
        cb(null, user);
    });

    require('./strategies/local.strategy')();
};

module.exports = passAuth;
