/**
 * Created by kcoleman on 2/14/2015.
 */
'use strict';

var server = require('./lib/server');
var router = require('./lib/router');
var util = require('./lib/util');

// Demo request handler for GET requests.
function testGetRouteHandler(request, response, indexParam) {
	var message = {};
	message.msg = 'hello world';
	message.indexParam = indexParam;
	util.writeSuccess(response, JSON.stringify(message));
}

// Demo request handler for PATCH requests.
function testPatchRouteHandler(request, response, indexParam) {
	util.getJsonBody(request, response, function (body) {
		body.msg = 'hello world';
		body.indexParam = indexParam;
		util.writeSuccess(response, JSON.stringify(body));
	});
}

/*
* Add a route to request handler map with the addRoute method
* The first parameter is the base route.
* The second parameter is the request method.
* The third parameter is a function that will handle the request
* */
router.addRoute('/unicorns', 'get', testGetRouteHandler);
router.addRoute('/unicorns', 'patch', testPatchRouteHandler);

/*
* Start the server using the start method.
* The first parameter is the port the server will use to listen for requests.
* The second parameter is the router to use to process requests.
**/
server.start(3000, router.route);
