/**
 * Created by kcoleman on 2/14/2015.
 */
'use strict';

var http = require('http');
var url = require('url');

function start(port, route) {
	function onRequest(request, response) {
		var baseRoute = '/' + url.parse(request.url).pathname.split('/')[1];
		var indexParam = url.parse(request.url).pathname.split('/')[2];

		route(baseRoute, request, response, indexParam);

	}

	http.createServer(onRequest).listen(port);
	console.log('Server started.');
}

exports.start = start;

