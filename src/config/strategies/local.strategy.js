var passport = require('passport'),
    bcrypt = require('bcrypt'),
    LocalStrategy = require('passport-local').Strategy,
    enVars = require('../../config/config.js')(process.env.NODE_ENV),
    mongoClient = require('mongodb').MongoClient,
    mongoUrl = enVars.mongoUrl;

var passLocalStrat = function () {
    passport.use(new LocalStrategy({
            usernameField: 'username',
            passwordField: 'password'
        },
        function (username, password, cb) {
            mongoClient.connect(mongoUrl, function (err, db) {
                db.collection('users').findOne({username: username}, function (dbErr, dbRes) {
                    try {
                        var loginStatus = bcrypt.compareSync(password, dbRes.password);

                        if (loginStatus) {
                            var user = dbRes;
                            delete user.password;
                            cb(null, user);
                        } else {
                            // Not the user
                            console.log('failed loggin in user');
                            cb(loginStatus);
                        }
                    } catch (err) {
                        // Most likely the username was not found and dbRes is null
                        loginStatus = false;
                        cb(loginStatus);
                    }
                });
            });
        }));
};

module.exports = passLocalStrat;
