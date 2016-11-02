var config = require('./src/config/config')(process.env.NODE_ENV),
    express = require('express'),
    app = express(),
    mongoose = require('mongoose'),
    passport = require('passport'),
    cookiePArser = require('cookie-parser'),
    bodyParser = require('body-parser'),
    session = require('express-session');

mongoose.connect(config.mongoUrl);

app.use(express.static('dist'));

app.set('views', 'src/server/views');
app.set('view engine', 'ejs');

require('./src/server/routes/router')(app, passport);

app.listen(config.port, function (err) {
    if ("production" !== process.env.NODE_ENV) {
        console.log('Running server on port ' + config.port);
    }

    if (err) {
        console.log('error running server on port ' + config.port);
    }
});
