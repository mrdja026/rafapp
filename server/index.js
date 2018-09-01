import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import session from 'express-session';
var MongoStore = require('connect-mongo')(session);
import auth from './routes/auth';
import post from './routes/postservice';
import user from './routes/userservice';
import subscription from './routes/subscriptionservice';
import cloudinary from 'cloudinary';
import assets from './routes/assets';
import comment from './routes/commentservice';
import { CLOUDINARY_INFO, SOME_API_SECRET } from './const';
cloudinary.config(CLOUDINARY_INFO);

const PORT = 3000;
const SECRET = SOME_API_SECRET;

const App = express();
App.use(bodyParser.json());
mongoose.connect('mongodb://localhost/raf-app');
var db = mongoose.connection;
db.on('error', (error) => { console.error('Server to db connection failed', error) });

db.once('open', () => { console.log('Server db connection: OK') })


App.use(session({
    secret: SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
    store: new MongoStore({
        mongooseConnection: mongoose.connection,
        collection: 'session',
    })
}));

App.use(bodyParser.urlencoded({ extended: false }));
App.use('/', auth);
App.use('/post', post);
App.use('/', user);
App.use('/', assets)
App.use('/comment', comment);
App.use('/sub', subscription);


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
});
