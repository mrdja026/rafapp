import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import Router from './routes/router';
let mongoWithSession = MongoStore(session);

const PORT = 3000;
const SECRET = '2DCoNci2jmVRLFeXRNfaozev3AfLpxDjh0sfMXGY4K4SNlIuE5KATVPrryllAfH0KVVzSVrJMsaPLv4QcgI7wwIBhWCZtGaMrWTX';

const App = express();

mongoose.connect('mongodb://localhost/raf-app');
var db = mongoose.connection;
db.on('error', (error) => { console.error('Server to db connection failed', error) });

db.once('open', () => { console.log('Server db connection: OK') })


App.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true }
}));
App.use(bodyParser.json());
App.use(bodyParser.urlencoded({ extended: false }));
App.use('/', Router);



// catch 404 and forward to error handler
App.use((req, res, next) => {
    var err = new Error('File Not Found');
    err.status = 404;
    next(err);
});

// error handler
// define as the last app.use callback
App.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.send(err.message);
});


App.listen(PORT, () => {
    console.log('Server running port ' + PORT);
})
