//nodejs backend
// require.paths.unshift('/usr/local/lib/node_modules');
var http = require('http'),
    fs = require('fs'),
    jsdom = require('jsdom');
    // correction made on May 4, 2011, removing this unnecessary require: flow = require('flow'),
    // mustache = require('mustache');

// var products = require('./fixtures/products_fixture');

// var productSummaryTemplate = fs.readFileSync('component_templates/product_summary.html','utf-8');

http.createServer(function(request,response) {
      	var qunitTestPage = fs.readFileSync('/home/lucius/workspace/cinodine/mocks/All.test.html','utf-8');
        var document = jsdom.jsdom(qunitTestPage);
        var window = document.createWindow();
        
        // process.stdout.write(qunitTestPage);
        // process.stdout.write('page loaded');
        // jsdom.jQueryify(window, './jquery.js', function() {
                // window.$('html').html(page_template);
                // window.$('h2').html("Content Added to DOM by Node.js Server");
                // for (var i=0; i < products.length; i++) {
                    // productSummaryHtml = mustache.to_html(productSummaryTemplate, products[i]);
                    // window.$('#productList').append(productSummaryHtml);
                // }
                response.writeHead(200, {'Content-Type': 'text/html'});
                // response.end("<!DOCTYPE html>\n" + window.$('html').html());
                response.end(qunitTestPage);
            // });
    }).listen(8078);