var http        = require('http'),
    fs 			= require('fs'),
    log         = require('../deps/node-qunit-jsdom/lib/log.js'),
    config      = require('../config'),
    jsdom       = require('jsdom'),
    testrunner  = require('qunit-jsdom');


function parseToXUnit(summary) {


    jsdom.env({
        html    : '<testsuites></testsuites>',
        scripts : [
            '../deps/jquery-1.7.2.min.js'
        ]
    },
    function(err, window) {
        (function($) {
            summary.forEach(function(testsuite) {
                
                // console.log("test name\n", testsuite.tests, testsuite.errors);
                var testSuite = $('<testsuite></testsuite>'); 
                
                testSuite
                    .attr('name', testsuite.tests)
                    .attr('errors', testsuite.errors.length)
                    .attr('failures', testsuite.failed)
                    .attr('tests', testsuite.total)
                    // append errors or system out
                    .append(function() {
                        var failure         = testsuite.errors.length ? testsuite.errors : testsuite.failures;
                        var fullFailureMsg  = '';
                        
                        failure.forEach(function(elem) {
                            fullFailureMsg += 'Test name: "' + elem.test + '"\n';
                            fullFailureMsg += elem.message + '\n';
                            fullFailureMsg += elem.source + '\n';
                        });

                        fullFailureMsg = (function() {
                            return $('<div/>').text(fullFailureMsg).html();
                        }());

                        return (failure.length ?
                            '<failure>' + fullFailureMsg + '</failure>' :
                            '<system-out />');
                    })
                    .appendTo('testsuites');
                    
                $('<testcase></testcase>')
                    .attr('name', testsuite.tests)
                    .attr('time', testsuite.runtime/1000)
                    .appendTo(testSuite);
            });
            
// <?xml version="1.0" encoding="UTF-8" standalone="yes"?>


            console.log($('testsuites').get(0).outerHTML);            
        }(window.jQuery));
        
    });    
}

http.createServer(function(request, response) {
    // set unlimited listeners
    process.setMaxListeners(0);
    
    // turn off the options, we don't need any visualisation
    testrunner.options.log = {};
             
    var afterTests = function(err, stats, summary) {
        parseToXUnit(summary);
        log.reset()
        response.end("tests finished\n");
    }
            
    // TODO dependencies necessary
    testrunner.run(config.paths, afterTests);
}).listen(8078);