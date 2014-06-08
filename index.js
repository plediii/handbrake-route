"use strict";

var express = require('express');
var router = express.Router();
var encoder = require('./encoder.js');

router.get('/status', function(req, res) {
    res.send(encoder.encodeStates);
});

router.get('/status/:stateid', function(req, res) {
    var stateid = req.params.stateid;
    if (encoder.encodeStates.hasOwnProperty(stateid)) {
        res.send(encoder.encodeStates[stateid]);
    }
    else {
        res.status(404).send('Not found.');
    }
});

module.exports = router;
router.encoder = encoder;
