const { Router } = require('express');
const validate = require('express-jsonschema').validate;

const router = Router();
const authSchema = require('./schema');
const ctrl = require('./ctrl');

/**
 * @api {post} /auth/login Login
 * @apiName Login
 * @apiGroup Auth
 * @apiDescription Login
 * @apiParamExample {json} Request-Example:
 *       {
 *          "email": "test@gmail.com",
 *          "password": "Password@123"
 *       }
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *        "err": false,
 *        "msg": null,
 *        "data": {
 *              "id": 5,
 *              "first_name": "Test",
 *              "last_name": "Test",
 *              "email": "test@gmail.com",
 *              "phone": null,
 *              "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NSwiZmlyc3RfbmFtZSI6IlNoaWtoaWwiLCJsYXN0X25hbWUiOiJTIiwiZW1haWwiOm51bGwsImVtYWlsX3ZlcmlmaWVkX29uIjoiMjAyMC0wOC0xOFQxNToxNzoxMi4xNzFaIiwicGhvbmUiOm51bGwsInBob25lX3ZlcmlmaWNhdGlvbl9jb2RlIjpudWxsLCJwaG9uZV92ZXJpZmllZF9vbiI6bnVsbCwic29jaWFsX2lkIjoic3Zuc2hpa2hpbDYxOUBnbWFpbC5jb20iLCJwYXNzd29yZF9yZXNldF90b2tlbiI6bnVsbCwicGFzc3dvcmRfcmVzZXRfcmVxdWVzdGVkX2RhdGUiOm51bGwsImxhc3RfbG9naW5fZGF0ZSI6bnVsbCwiaWF0IjoxNTk3NzYzODM1fQ.JfUKVbhKTRtr2Bw8JrIsh3BmZ5Vnb0bvCgl9iko4rBA"
 *          }
 *     }
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 500 Internal Server Error
 *    {
 *      "err": true,
 *      "msg": "An internal error occured.",
 *      "data": null
 *    }
 */
router.post('/auth/login', validate({ body: authSchema.login }), ctrl.login);

module.exports = router;
