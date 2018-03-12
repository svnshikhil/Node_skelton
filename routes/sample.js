var express = require('express');
var router = express.Router();
var validate = require('express-jsonschema').validate;
var sampleSchema = require('../schema/sample')
router.post("/", validate({ body: sampleSchema }), function (req, res, next) {
    console.log("----INSIDE SAMPLE----")
    res.send("----INSIDE SAMPLE----")
})

module.exports = router;