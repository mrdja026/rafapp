var express = require('express');
var Router = express.Router();


Router.get('/home', function (req, res, next) {
    console.log('Hello world');
    res.send({ text: 'LOL' });
});

Router.post('/home', function (req, res, next) {
    console.log(req.body);
});


module.exports = Router;