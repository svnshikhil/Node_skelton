const router = require('express').Router();
const validate = require('express-jsonschema').validate;

const sample = require('./sample');
const sampleSchema = require('../../schema/sample');

router.get('/sample',  sample.getSample)
router.post('/sample', validate({ body: sampleSchema }), sample.samplePost)

module.exports = router