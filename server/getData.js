var express = require('express');
var router = express.Router();
var config = require('config');
var host = config.get('host');

router.post("/", function (req, res, next) {
    console.log("----INSIDE GET DATA----")
    res.send("----INSIDE GET DATA----")
})

module.exports = router;