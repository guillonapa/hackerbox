const JwtStrategy = require('passport-jwt').Strategy;
const { ExtractJwt } = require('passport-jwt');
// const mongoose = require("mongoose");

const User = require('../models/users');

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.KEY_OR_SECRET;

module.exports = passport => {
    passport.use(
        new JwtStrategy(opts, (jwtPayload, done) => {
            User.findById(jwtPayload.id)
                .then(user => {
                    if (user) {
                        return done(null, user);
                    }
                    return done(null, false);
                })
                .catch(err => console.log(err));
        })
    );
};
