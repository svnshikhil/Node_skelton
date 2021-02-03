const jwt = require('jsonwebtoken');
const db = require('../../db');
const { UnauthorizedError } = require('../../services/error');
const crypto = require('crypto');
const { USER_RESPONSE_FIELDS } = require('../../constants');

class Auth {
    static async emailLogin(params) {
        const password = this.hashString(params.password);
        const query = {
            email: params.email,
            password
        };
        const user = await db('users').select(USER_RESPONSE_FIELDS).where(query)
            .first();
        if (user) {
            return user;
        } else
            throw new UnauthorizedError('Invalid email or password');
    }
    static async generateToken(payload) {
        if (payload.ID) payload.id = payload.ID;
        return jwt.sign(payload, process.env.JWT_KEY);
    }
    static async validateToken(payload) {
        const user = await db('users').where('id', payload.id).first();
        if (!user) {
            throw new UnauthorizedError();
        } else {
            return user;
        }
    }
    static hashString(input) {
        const hash = crypto.createHash('sha256').update(input).digest('base64');
        return hash;
    }
}

module.exports = Auth;