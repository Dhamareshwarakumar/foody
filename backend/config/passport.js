const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

const User = require('../models/User');

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.JWT_SECRET;


module.exports = passport => {
    passport.use(new JwtStrategy(opts, (jwt_payload, done) => {
        User.findOne({ email: jwt_payload.email })
            .then(resUser => {
                if (resUser) {
                    const user = {
                        id: resUser._id,
                        email: resUser.email,
                        role: resUser.role
                    };

                    return done(null, user);
                } else {
                    return done(null, false);
                }
            })
            .catch(err => done(err, false));
    }))
}