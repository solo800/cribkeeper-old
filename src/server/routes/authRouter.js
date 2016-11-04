var fu = require('../custom_modules/fpUtil'),
    User = require('../models/User'),
    express = require('express'),
    authRouter = express.Router(),
    passport = require('passport'),
    bcrypt = require('bcrypt'),
    enVars = require('../../config/config.js')(process.env.NODE_ENV),
    mongoClient = require('mongodb').MongoClient,
    mongoUrl = enVars.mongoUrl;

var router = function () {
    authRouter.route('/signUp')
        .post(function (req, res) {
            mongoClient.connect(mongoUrl, function (err, db) {
                if (!err) {
                    var user = User(req.body);
                    if (!user.valid) {
                        console.log(req.body, user);
                        res.status(400).send('This user is not valid');
                    } else {
                        // Check to see if this username exists in the db
                        db.collection('users').find({username: user.username}).toArray(function (err, docs) {
                            if (!err && fu.ctp(docs, 'array')) {
                                if (0 === docs.length) {
                                    console.log('signing up', user, docs.length);
                                    // Hash password
                                    var hash = bcrypt.hashSync(user.password, 10);
                                    user.password = hash;
                                    user.created = new Date().getTime();
                                    db.collection('users').insert(user, function (dbErr, dbSuc) {
                                        if (!dbErr) {
                                            req.login(req.body, function () {
                                                console.log('successful signup', dbSuc);
                                                res.send(dbSuc);
                                            });
                                            db.close();
                                        } else {
                                            fu.db.warn(dbErr, mongoUrl);
                                            db.close();
                                        }
                                    });
                                } else {
                                    console.log('sending fail');
                                    res.status(400).send('This username already exists. Please select another.');
                                    db.close();
                                }
                            } else {
                                fu.db.warn(err, mongoUrl);
                                res.status(400).send('Error signing up new user');
                                db.close();
                            }
                        });
                    }
                } else {
                    fu.db.warn(err, mongoUrl);
                    res.status(400).send('Error connecting to DB');
                    db.close();
                }
            });
        });
    authRouter.route('/login')
        .post(passport.authenticate('local'), function (req, res) {
            // If we got this far the user is valid
            delete req.user.password;
            res.send(req.user);
        });
    authRouter.route('/logout')
        .post(function (req, res) {
            req.logout();
            res.send('logout successful');
        });
    return authRouter;
};

module.exports = router;
