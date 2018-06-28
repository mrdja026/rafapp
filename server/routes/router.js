import express from 'express';
import User from '../models/user';
const Router = express.Router();
const HTTP_UNAUTHORIZED = 401;

const checkAuth = (req, res, next) => {
    if (req.session && req.session.userId) {
        return next();
    } else {
        let error = new Error('Auth failed');
        error.status = HTTP_UNAUTHORIZED;
        return next(error);
    }
}

Router.post('/register', function (req, res, next) {
    let { username, email, password } = req.body;
    let response = {};
    User.create({ username, email, password }, (error, user) => {
        if (error) {
            response = { OK: false }
        } else {
            response = { OK: true, user: user };
        }
    });

    res.send(response);
});

Router.post('/login', (req, res, next) => {
    let { username, password } = req.body;
    console.log(req.body, res);
    User.authenticate(username, password, (error, user, res) => {
        if (error || !user) {
            let error = new Error('Wrong email or password');
            error.status = HTTP_UNAUTHORIZED;
            return next(error);
        } else {
            req.session.userId = user._id;
            return res({ ok: true });
        }
    })
});

Router.post('/logout', (req, res, next) => {
    if (req.session) {
        req.session.destroy((error) => {
            if (error) {
                return next(error);
            } else {
                return res({ ok: true })
            }
        })
    }
});

Router.post('/testAuth', checkAuth, (req, res, next) => {
    res.send('OK');
})

export default Router;