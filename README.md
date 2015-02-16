# Simple Rest Framework #

----------

This framework is designed to make it easier to get a simple rest service up and running in node. The simple rest framework provides a server that will respond to requests, a router that will match resource requests to request handler functions, and utility functions to parse JSON request streams.

## TL;DR ##

See the index.js file for an example implementation.

## Setup ##

To start using the simple rest framework, you first require the library components.

    var server = require('./lib/server');
    var router = require('./lib/router');
    var util = require('./lib/util');

Next, you add your request handler functions. You can define your request handlers in a separate file and require them if you wish.

    function testGetRouteHandler(request, response, indexParam) {
    	var message = {};
    	message.msg = 'hello world';
    	message.indexParam = indexParam;
    	util.writeSuccess(response, JSON.stringify(message));
    }

Use the util.getJsonBody method to parse incoming JSON request streams.

    function testPatchRouteHandler(request, response, indexParam) {

		// handle json request stream
    	util.getJsonBody(request, response, function (body) {
    		body.msg = 'hello world';
    		body.indexParam = indexParam;
    		util.writeSuccess(response, JSON.stringify(body));
    	});
    }

Add a route to request handler map with the addRoute method
The first parameter is the base route. The second parameter is the request method. The third parameter is a function that will handle the request

    router.addRoute('/unicorns', 'get', testGetRouteHandler);
    router.addRoute('/unicorns', 'patch', testPatchRouteHandler);


Start the server using the start method. The first parameter is the port the server will use to listen for requests. The second parameter is the router to use to process requests.

    server.start(3000, router.route);

## Routing ##
The router will match the first element of the request path and the request method to a specific request handler. For example, a GET request to **http://localhost:3000/unicorns/rainbows/magic** will use the **/unicorns** portion of the URL and the GET request method to look up a request handler.

The rainbows portion of the URL will be passed to request handlers as the third parameter.

The **magic** portion of the URL (and any other portion) will be ignored.