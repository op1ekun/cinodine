//nodejs backend
// require.paths.unshift('/usr/local/lib/node_modules');
var http        = require('http'),
    fs 			= require('fs'),
    log         = exports.log = require('../deps/node-qunit-jsdom/lib/log.js'),
    config      = require('../config'),
    testrunner  = require('qunit-jsdom');

/*
    INPUT:
    { 
        '0': null,
        '1': { 
            files       : 1,
            assertions  : 3,
            failed      : 2,
            passed      : 1,
            runtime     : 14,
            tests       : 3
        }
    }
 */
var afterTests = function() {
    log.reset();
    console.log(arguments);
}

http.createServer(function(request, response) {
    testrunner.options.log = {};           
            
    // TODO dependencies necessary
    testrunner.run(config.paths, afterTests);
    response.end("tests started");
}).listen(8078);