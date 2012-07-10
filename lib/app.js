//nodejs backend
// require.paths.unshift('/usr/local/lib/node_modules');
var http        = require('http'),
    fs 			= require('fs'),
    // jsdom 	    = require('jsdom'),
    // testrunner	= require('qunit');
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
var afterTests = function() {}

http.createServer(function(request, response) {
    
        testrunner.run({
            code	: './mocks/mock.js',
		    tests	: './t/fake.test.js'
        }, afterTests);
	
}).listen(8078);