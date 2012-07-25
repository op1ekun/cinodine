//nodejs backend
// require.paths.unshift('/usr/local/lib/node_modules');
var http        = require('http'),
    fs 			= require('fs'),
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
var afterTests = function() {}

http.createServer(function(request, response) {
    var cases = [];
    
    // config.paths.forEach(function(elem, index) {
        // for (var key in elem) {
            // var codes = fs.readdirSync(key);
//             
            // // dynamically create test suites config
            // codes.forEach(function(value, index) {
                // var test = value.split('.');
//                 
                // // TODO change to configurable paths
                // cases.push({
                    // code    : key + value,
                    // // assume that every code file has one test suite
                    // // originally you can have multiple tests for one code
                    // // FIXME?
                    // tests   : elem[key] + test[0] + '.test.js'
                // }); 
            // }); 
        // }
    // });
    
    cases = [
        {
            code    : "./mocks/mock.js",
            tests   : "./t/mock.test.js"   
        },
        {
            code    : "../LocalCache/lib/Storage.js",
            tests   : "../LocalCache/t/Storage.test.js"
        },
        {
            deps    : "../LocalCache/lib/Storage.js",
            code    : "../LocalCache/lib/Cache.js",
            tests   : "../LocalCache/t/Cache.test.js"
        }
    ];   
            
testrunner.options.log = {
    // log assertions overview
    assertions: false,
    
    // log expected and actual values for failed tests
    errors: false,
    
    // log tests overview
    tests: false,
    
    // log summary
    summary: true,
    
    // log global summary (all files)
    globalSummary: false,
    
    // log currently testing code file
    testing: false
},           
            
    // TODO dependencies necessary
    testrunner.run(cases, afterTests);
    response.end("tests started");
}).listen(8078);