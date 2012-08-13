var http        = require('http'),
    fs          = require('fs'),
    log         = require('../deps/node-qunit-jsdom/lib/log.js'),
    config      = require('../config'),
    jsdom       = require('jsdom'),
    testrunner  = require('qunit-jsdom');

    // 1) I didn't want to use external jQuery script so I used the one from npm (similary do node-qunit)
    // 2) I like jsdom very much so I used it to create XML file
    //  2a) hmtl tag in the jsdom is a small price for a convinience of building nodes :)
    
    // initialize only once
    var doc     = jsdom.jsdom('<html><testsuites></testsuites></html>');
    var window  = doc.createWindow();
    jQuery      = require('jquery').create(window);
    
function parseToXUnit(summary) {
    
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
        
        var fd = fs.openSync('./results.xml', 'w+');
        fs.writeSync(fd, '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>\n' +
            $('testsuites').get(0).outerHTML);
        
        // clear after creating XML
        $('testsuites').text('');

    }(jQuery));
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