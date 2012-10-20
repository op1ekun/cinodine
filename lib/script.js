var fs          = require('fs');
var log         = require('../deps/node-qunit-jsdom/lib/log.js');
var config      = require('../config');
var libxml      = require('libxmljs');
var testrunner  = require('../deps/node-qunit-jsdom/lib/testrunner.js');
// var testrunner  = require('qunit-jsdom');
 
function parseToXUnit(summary) {
    // console.log('summary', summary);
    
    var doc             = libxml.Document();
    var testsuitesNode  = doc.node('testsuites');
    
    for (var suite in summary) {
        var testSuite   = testsuitesNode.node('testsuite');
        
        // // create testsuite tag (a container for all the testcase tags)
        testSuite
            .attr('name', summary[suite].module)
            .attr('failures', summary[suite].failed)
            .attr('tests', summary[suite].total);

        var testCases   = summary[suite].testCases;

        testCases.forEach(function(testcase) {
            var testcaseNode = testSuite.node('testcase');
            
            var result      = '';
            var allFailures = summary[suite].failures;
            var failures    = allFailures[testcase];
            
            if (failures) {
                failures.forEach(function(failure) {
                    var failureNode    = testcaseNode.node('failure');
                    // add all test output to CDATA to avoid escaping special characters etc.
                    failureNode.cdata('\n\n' + failure.message + ' failed ' +
                                        // display source if available 
                                        (failure.source ? failure.source : '') +
                                        // display excepted and actual if available 
                                        ('expected' in failure  ?   '\nExpected: ' + 
                                                                    failure.expected + 
                                                                    '.\nActual: ' + 
                                                                    failure.actual
                                                                :   ''));
                });
            }

            testcaseNode
                .attr('name', testcase);
        });
    }
    
    var fd = fs.openSync('./results.xml', 'w+');
    fs.writeSync(fd, doc.toString());
} 
    
// set unlimited listeners
process.setMaxListeners(0);

// turn off the options, we don't need any visualisation
testrunner.options.log = {};
         
var afterTests = function(summary) {
    parseToXUnit(summary);
    log.reset()
}
        
// TODO dependencies necessary
testrunner.run(config.paths, afterTests);