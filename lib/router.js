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
	var routeInfo = routeList.filter(function(route) {
		return route.baseRoute === baseRoute;
	})[0];
	console.log('routeInfo: ' + routeInfo.baseRoute);
	if(typeof routeInfo.handler === 'function' && routeInfo.method.toUpperCase() === request.method) {
		console.log('handling route');
		routeInfo.handler(request, response, indexParam);
	}
}

exports.addRoute = addRoute;
exports.route = route;
