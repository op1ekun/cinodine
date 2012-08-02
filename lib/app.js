var http        = require('http'),
    fs 			= require('fs'),
    log         = require('../deps/node-qunit-jsdom/lib/log.js'),
    config      = require('../config'),
    testrunner  = require('qunit-jsdom');


http.createServer(function(request, response) {
    // set unlimited listeners
    process.setMaxListeners(0);
    
    // turn off the options, we don't need any visualisation
    testrunner.options.log = {};
             
    var afterTests = function(err, stats, summary) {
        console.log(summary);
        log.reset()
        response.end("tests finished\n");
    }
            
    // TODO dependencies necessary
    testrunner.run(config.paths, afterTests);
}).listen(8078);