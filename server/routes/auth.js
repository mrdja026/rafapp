import express from 'express';
import User from '../models/user';
import { checkAuth, responseHeader, HTTP_UNAUTHORIZED } from '../utls/apiUtils';
const Router = express.Router();
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
    let _res = res;
    User.authenticate(username, password, (error, user, res) => {
        if (error || !user) {
            let error = new Error('Wrong email or password');
            error.status = HTTP_UNAUTHORIZED;
            return next(error);
        } else {
            req.session.userId = user._id;
            return _res.send({ ok: true });
        }
    })
});

Router.post('/logout', (req, res, next) => {
    if (req.session) {
        req.session.destroy((error) => {
            if (error) {
                return next(error);
            } else {
                return res.send({ ok: true })
            }
        })
    }
});
Router.post('/testAuth', checkAuth, responseHeader, (req, res, next) => {
    return res.json({ result: [1,2,3,4,5] });
})
export default Router;