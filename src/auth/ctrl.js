const { logFmt, apiFmt } = require('../services/fmt');
const Auth = require('./models/Auth');

class Controller {
    static async login(req, res, next) {
        try {
            const params = req.body;
            const user = await Auth.emailLogin(params);
            const token = await Auth.generateToken(user);
            user.token = token;
            res.json(apiFmt(user));
        } catch (e) {
            logFmt(req, e);
            next(e);
        }
    }
}
module.exports = Controller;
