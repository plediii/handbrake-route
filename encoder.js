"use strict";

var 
  handbrake = require("handbrake-js"),
  path = require("path"),
  _ = require('lodash'),
  uid = require('uid2');

var encodeStates = exports.encodeStates = {};
  
var Encoder = exports.Encoder = function (options) {
    // Module variables
    this.fileEncodeOptions = _.defaults({}, options, {
        encoder: "x264",
        "keep-display-aspect":true,
        modulus:16,
        vb:"2500",
        quality:"20",
        "crop":"0:0:0:0"});
    this.encodeStates = encodeStates;
};

_.extend(Encoder.prototype, {
    encode: function (input, outputDir) {
        var encodeStates = this.encodeStates;
        var id = uid(24);
        var ext = path.extname(input);

        var state = encodeStates[id] = {
            id: id,
            input: input,
            output: path.normalize(outputDir + path.sep + id + ".mp4")
        };
        
        var encOptions = _.extend({}, this.fileEncodeOptions, {
            input: vid.input,
            output: vid.output
        });

        var handle = handbrake.spawn(encOptions)
            .on('error', function (err) {
                console.log('Error while encoding ', vid, ': ', err);
                delete encodeStates[id];
            })
            .on('progress', function (progress) {
                vid.progress = progress;
            })
            .on("complete", function(params) {
                console.log("FINISH encoding ", vid, "\n\t");
                vid.progress = 'complete';
                delete encodeStates[id];
            });
        handle.vid = vid;
        handle.id = id;

        return handle;
    }
});

