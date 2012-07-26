//nodejs backend
// require.paths.unshift('/usr/local/lib/node_modules');
var http        = require('http'),
    fs 			= require('fs'),
    log         = exports.log = require('../deps/node-qunit-jsdom/lib/log.js'),
    config      = require('../config'),
    testrunner  = require('qunit-jsdom');


http.createServer(function(request, response) {
    testrunner.options.log = {};  
             
    var afterTests = function(err, stats, summary) {
        console.log(summary);
        log.reset()
        response.end("tests finished\n");
    }
            
    // TODO dependencies necessary
    testrunner.run(config.paths, afterTests);
}).listen(8078);