const knex = require("knex");
const bodyParser = require("body-parser");
const compression = require("compression");
const moment = require('moment');
const { knexSnakeCaseMappers } = require("objection");
const dbConfig = require("./src/config/knexfile");
const syslog = require("./src/services/log");

const errorHandler = require("./src/middleware/error");

const auth = require("./src/auth/router");
const passport = require("./src/services/passport");
const { UnauthorizedError } = require('./src/services/error');


module.exports = (app) => {
    syslog.info('Configuring DB ', process.env.NODE_ENV);
    const opts = {
        ...dbConfig[process.env.NODE_ENV],
        ...knexSnakeCaseMappers()
    };
    const dbClient = knex(opts);
    const DATE_OID = 1082;

    dbClient.client.driver.types
        .setTypeParser(DATE_OID, (val) => (val == null ? null : moment.tz(val, 'America/Denver')));

    app.use(compression());
    app.use(bodyParser.urlencoded({
        extended: true
    }));
    app.use(bodyParser.json());
    app.use(passport.initialize());

    syslog.info("Registering modules");

    const baseUrl = `/${process.env.VERSION}`;
    app.use(baseUrl, auth);
    app.use((req, res, next) => {
        const tokenError = new UnauthorizedError(`Invalid token provided`);
        passport.authenticate('JWT', {
            session: false
        }, (err, user, info) => {
            if (err) {
                console.log('Error in token : ', err);
                next(tokenError);
            } else {
                if (!user) {
                    next(tokenError);
                }
                req.user = user;
                next();
            }
        })(req, res, next);
    });
    app.use(baseUrl, errorHandler);
};