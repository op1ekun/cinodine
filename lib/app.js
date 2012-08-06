var http        = require('http'),
    fs 			= require('fs'),
    log         = require('../deps/node-qunit-jsdom/lib/log.js'),
    config      = require('../config'),
    jsdom       = require('jsdom'),
    testrunner  = require('qunit-jsdom');


function parseToXUnit(summary) {
    // jsdom.jsdom("", null, {features: {QuerySelector: true}});  

    // var browser = jsdom.browserAugmentation(jsdom.dom.level3.core, {});
    // var doc     = new browser.Document();

    jsdom.env({
        html: '<?xml version="1.0"?><doc></doc>',
        scripts: [
            '../deps/jquery-1.7.2.min.js'
        ]
    },
    function(err, window) {
        (function($) {
            // start preparing assembly element
            var totalPassed = 0;
            var totalFailed = 0;
            
            for (var i in summary) {
                totalPassed += summary[i].passed;
                totalFailed += summary[i].failed;
            }
            
            $('<assembly>SEMPro Front-end tests</assembly>')
                .attr('failed', totalFailed)
                .attr('passed', totalPassed)
                .attr('total', totalFailed + totalPassed)
                .appendTo('doc');
            
            console.log($('doc').get(0).outerHTML, summary);
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