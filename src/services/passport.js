const passport = require('passport');
const { Strategy: JwtStrategy, ExtractJwt } = require('passport-jwt');
const { UnauthorizedError } = require('./error');
const auth = require('../auth/models/Auth');


const jwtOpts = {
    secretOrKey: process.env.JWT_KEY,
    jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('JWT'),
    authScheme: 'JWT',
};

passport.use('JWT',
    new JwtStrategy(jwtOpts, async (payload, cb) => {
        try {
            const response = await auth.validateToken(payload);
            return cb(null, response);
        } catch (err) { return cb(new UnauthorizedError(), false); }
    }),
);


module.exports = passport;
