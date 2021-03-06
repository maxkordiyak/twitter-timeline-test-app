const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const expressJwt = require('express-jwt');
const request = require('request');
const Twitter = require('twitter');
const passport = require('passport');
const TwitterTokenStrategy = require('passport-twitter-token');
const twitterConfig = require('../../config/twitter.config.js');

const User = require('../../models/user');

passport.use(new TwitterTokenStrategy({
        consumerKey: twitterConfig.consumerKey,
        consumerSecret: twitterConfig.consumerSecret,
        includeEmail: true
    }, function (token, tokenSecret, profile, done) {
        User.upsertTwitterUser(token, tokenSecret, profile, function(err, user) {
            return done(err, user);
        });
    }));

const createToken = function(auth) {
    return jwt.sign({
            id: auth.id
        }, 'my-secret',
        {
            expiresIn: 60 * 120
        });
};

const generateToken = function (req, res, next) {
    req.token = createToken(req.auth);
    return next();
};

const sendToken = function (req, res) {
    res.setHeader('x-auth-token', req.token);
    return res.status(200).send(JSON.stringify(req.user));
};

router.route('/auth/twitter/reverse')
    .post(function(req, res) {
        request.post({
            url: 'https://api.twitter.com/oauth/request_token',
            oauth: {
                oauth_callback: "http%3A%2F%2Flocalhost%3A3000%2Ftwitter-callback",
                consumer_key: twitterConfig.consumerKey,
                consumer_secret: twitterConfig.consumerSecret
            }
        }, function (err, r, body) {
            if (err) {
                return res.send(500, { message: e.message });
            }

            var jsonStr = '{ "' + body.replace(/&/g, '", "').replace(/=/g, '": "') + '"}';
            res.send(JSON.parse(jsonStr));
        });
    });

router.route('/auth/twitter')
    .post((req, res, next) => {
        request.post({
            url: `https://api.twitter.com/oauth/access_token?oauth_verifier`,
            oauth: {
                consumer_key: twitterConfig.consumerKey,
                consumer_secret: twitterConfig.consumerSecret,
                token: req.query.oauth_token
            },
            form: { oauth_verifier: req.query.oauth_verifier }
        }, function (err, r, body) {
            if (err) {
                return res.send(500, { message: err.message });
            }

            const bodyString = '{ "' + body.replace(/&/g, '", "').replace(/=/g, '": "') + '"}';
            const parsedBody = JSON.parse(bodyString);

            req.body['oauth_token'] = parsedBody.oauth_token;
            req.body['oauth_token_secret'] = parsedBody.oauth_token_secret;
            req.body['user_id'] = parsedBody.user_id;

            next();
        });
    }, passport.authenticate('twitter-token', {session: false}), function(req, res, next) {
        if (!req.user) {
            return res.send(401, 'User Not Authenticated');
        }

        // prepare token for API
        req.auth = {
            id: req.user.id
        };

        return next();
    }, generateToken, sendToken);

//token handling middleware
const authenticate = expressJwt({
    secret: 'my-secret',
    requestProperty: 'auth',
    getToken: function(req) {
        if (req.headers['x-auth-token']) {
            return req.headers['x-auth-token'];
        }
        return null;
    }
});

const getCurrentUser = function(req, res, next) {
    User.findById(req.auth.id, function(err, user) {
        if (err) {
            next(err);
        } else {
            req.user = user;
            next();
        }
    });
};

const getOne = function (req, res) {
    var user = req.user.toObject();

    delete user['twitterProvider'];
    delete user['__v'];

    res.json(user);
};


router.get('/search', authenticate, getCurrentUser, function(req, res) {
    const { username } = req.query;

    const client = new Twitter({
        consumer_key: twitterConfig.consumerKey,
        consumer_secret: twitterConfig.consumerSecret,
        access_token_key: req.user['twitterProvider'].token,
        access_token_secret: req.user['twitterProvider'].tokenSecret
    });

    client.get('statuses/user_timeline', { screen_name: username, count: 30 })
        .then(result => {
            res.json({
                data: result
            })
        })
        .catch(err => {
            res.status(500).json(err);
            console.log(err)
        })
});

module.exports = router;
