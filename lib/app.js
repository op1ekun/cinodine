//nodejs backend
// require.paths.unshift('/usr/local/lib/node_modules');
var http        = require('http'),
    fs 			= require('fs'),
    jsdom 	    = require('jsdom'),
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
    jsdom.env({
        html    : '<!DOCTYPE html><html><head><title>Title</title></head><body>My body</body></html>',
        scripts : [
            '../deps/jquery-1.7.2.min.js'
        ]
    }, 
    function (err, window) {
        var $ = window.jQuery;
        
        // global.window       = window;
        // global.navigator    = navigator;
        // global.document     = window.document;
        
        // console.log('jsdom env callback', global);
        
        // testrunner.run({
            // code    : './mocks/mock.js',
            // tests   : './t/fake.test.js'
        // }, afterTests);

        console.log($('body').html());
    });
    
        // var doc         = jsdom.jsdom('<!DOCTYPE html><html><head><title>jQuery testrunner</title></head><body></body></html>', 
                                    // null, { features: { QuerySelector: true } });
//         
        // var window      = doc.createWindow();
        // console.log(window);
// 
        // var navigator   = {
            // userAgent: 'node-js'
        // };
//         
        // global.window       = window;
        // global.navigator    = navigator;
        // global.document     = window.document;
//         
        // // var navigator   = { userAgent: "node-js" };
        // window.jQuery       = require('jquery');
//         
        // // fixtures
        // var div             = document.createElement('DIV');
        // console.log('div', div);
        // div.id              = 'wrapper';
        // var para1           = document.createElement('P');
        // para1.innerHTML     = 'paragraph 1';
        // div.appendChild(para1);
        // var para2           = document.createElement('P');
        // para2.innerHTML     = 'paragraph 2';
        // document.appendChild(div);
    
        console.log('testrunner', testrunner);
    
        testrunner.run({
            code	: './mocks/mock.js',
		    tests	: './t/fake.test.js'
        }, afterTests);
	
        // var document = jsdom.jsdom(qunitTestPage);
        // var window = document.createWindow();
        
        // process.stdout.write(qunitTestPage);
        // process.stdout.write('page loaded');
        // jsdom.jQueryify(window, './jquery.js', function() {
                // window.$('html').html(page_template);
                // window.$('h2').html("Content Added to DOM by Node.js Server");
                // for (var i=0; i < products.length; i++) {
                    // productSummaryHtml = mustache.to_html(productSummaryTemplate, products[i]);
                    // window.$('#productList').append(productSummaryHtml);
                // }
                // response.writeHead(200, {'Content-Type': 'text/html'});
                // response.end("<!DOCTYPE html>\n" + window.$('html').html());
                // response.end(qunitTestPage);
            // });
}).listen(8078);