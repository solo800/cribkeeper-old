// jshint esversion: 6
const config = require('./src/config/config')(process.env.NODE_ENV);
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const passport = require('passport');
const cookiePArser = require('cookie-parser');
const bodyParser = require('body-parser');
const session = require('express-session');

mongoose.connect(config.mongoUrl);

app.use(express.static('dist'));

app.set('views', 'src/server/views');
app.set('view engine', 'ejs');

// require('./src/config/passport')(app);

require('./src/server/routes/router')(app);

app.listen(config.port, function (err) {
    if ("production" !== process.env.NODE_ENV) {
        console.log('Running server on port ' + config.port);
    }

    if (err) {
        console.log('error running server on port ' + config.port);
    }
});
