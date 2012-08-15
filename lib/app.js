var http        = require('http'),
    url         = require('url'),
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
    // console.log('summary', summary);
    
    (function($) {
        
        for (var suite in summary) {
            var testSuite = $('<testsuite></testsuite>'); 
            
            var errorsCount = 0;
            
            for (var i in summary[suite].errors) {
                errorsCount++;                
            }
            
            // create testsuite tag (a container for all the testcase tags)
            testSuite
                .attr('name', summary[suite].module)
                .attr('errors', errorsCount)
                .attr('failures', summary[suite].failed)
                .attr('tests', summary[suite].total)
                .append('<system-out />')
                
            var testCases = summary[suite].testCases;
            
            testCases.forEach(function(testcase) {
                $('<testcase></testcase>')
                    .attr('name', testcase)
                    .append(function() {
                        var result = '';
                        
                        var failure = errorsCount ? summary[suite].errors : summary[suite].failures;
                        console.log(failure.test, testcase);
                        
                        if (failure[testcase]) {
                            result  =   $('<failure></failure>')
                                            .text('<![CDATA[' + failure[testcase].source + ']]>')
                                            .get(0).outerHTML;
                                            
                                            // encode entities to deal with eg. <anonymous>
                                            // .text('<![CDATA[' +
                                                // $('<div/>')
                                                // .text(failure[testcase].source)
                                                // .html() + ']]>')
                                            // .get(0).outerHTML;
                        }
                        
                        return result;
                    })
                    .appendTo(testSuite)    
            });
                
            testSuite
                .appendTo('testsuites');
        }
        
        var fd = fs.openSync('./results.xml', 'w+');
        fs.writeSync(fd, '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>' +
            $('testsuites').get(0).outerHTML);
        
        // clear after creating XML
        $('testsuites').text('');

    }(jQuery));
}
            
http.createServer(function(request, response) {
    // DEBUG only
    // var pathname = url.parse(request.url).pathname;
    // console.log('pathname', pathname);

    // set unlimited listeners
    process.setMaxListeners(0);
    
    // turn off the options, we don't need any visualisation
    testrunner.options.log = {};
             
    var afterTests = function(summary) {
        parseToXUnit(summary);
        log.reset()
        response.end('tests finished\n');
    }
            
    // TODO dependencies necessary
    testrunner.run(config.paths, afterTests);
}).listen(8078);