const express = require('express');
const validate = require('express-jsonschema').validate;

const router = express.Router();
const sampleSchema = require('../schema/sample');

router.post('/', validate({ body: sampleSchema }), (req, res) => {
    console.log('----INSIDE SAMPLE----');
    res.send('----INSIDE SAMPLE----');
});

module.exports = router;
