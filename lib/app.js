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
    
        // TODO paths should be configurable
        var codes = fs.readdirSync('./mocks');
        console.log(codes);
        
        codes.forEach(function(index, value) {
            codes[index] = './mocks/' + value; 
        }); 
    
        console.log(codes);
    
        testrunner.run({
            code    : codes,
            tests   : [ './t/fake.test.js' ],
            // tmpl    : [ './tmpl/mocks.tmpl' ]          
        }, afterTests);
	
}).listen(8078);