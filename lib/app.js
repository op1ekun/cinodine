//nodejs backend
// require.paths.unshift('/usr/local/lib/node_modules');
var http        = require('http'),
    fs 			= require('fs'),
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
        var codes = fs.readdirSync('./mocks');
        var cases = [];
        
        // dynamically create test suites config
        codes.forEach(function(value, index) {
            var test = value.split('.');
            
            // TODO change to configurable paths
            cases.push({
                code    : './mocks/' + value,
                // assume that every code file has one test suite
                // originally you can have multiple tests for one code
                // FIXME?
                tests   : './t/' + test[0] + '.test.js'
            }); 
        }); 
            
        testrunner.run(cases, afterTests);
}).listen(8078);