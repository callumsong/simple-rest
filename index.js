/**
 * Created by kcoleman on 2/14/2015.
 */
'use strict';

var server = require('./lib/server');
var router = require('./lib/router');

function testRouteHandler(request, response, indexParam) {
	response.writeHead(200, {'Content-Type': 'text/plain'});
	response.write('hello world');
	response.end();
	console.log('hello world ' + indexParam);
}

router.addRoute('/', 'get', testRouteHandler);
router.addRoute('/burp', 'get', testRouteHandler);

server.start(3000, router.route);
