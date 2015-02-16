/**
 * Created by kcoleman on 2/14/2015.
 */
'use strict';
var routeList = [];


function addRoute(baseRoute, method, handler) {
	var route = {};
	route.baseRoute = baseRoute;
	route.handler = handler;
	route.method = method;
	routeList.push(route);
}

function route(baseRoute, request, response, indexParam) {
	var routeInfo = routeList.filter(function (route) {
		return route.baseRoute === baseRoute;
	}).filter(function (requestMethod) {
		return requestMethod.method.toUpperCase() === request.method;
	})[0];

	if (routeInfo) {
		routeInfo.handler(request, response, indexParam);
	} else {

		response.writeHead(404, {
			'Content-Type': 'application/json'
		});

		response.write(JSON.stringify({error: 'resource not found'}));
		response.end();
	}
}

exports.addRoute = addRoute;
exports.route = route;
