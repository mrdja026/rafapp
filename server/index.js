var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var session = require('express-session');
var MongoStore  = require('connect-mongo')(session);
var Router = require('./routes/router');

const PORT = 3000;

const App = express();

mongoose.connect('mongodb://localhost/raf-app');
var db = mongoose.connection;
db.on('error' ,console.log.bind(console, 'Mongoconnection error'));
db.once('open' , function(){
    console.log('DB open');
})

App.use(bodyParser.json());
App.use(bodyParser.urlencoded({ extended: false }));
App.use('/', Router);
App.listen(PORT, () => {
    console.log('Server running port ' + PORT);
})
