/**
 * Created by kcoleman on 2/15/2015.
 */
'use strict';

var server = require('../lib/server');
var router = require('../lib/router');
var util = require('../lib/util');

var chai = require('chai');
var chaiHttp = require('chai-http');

chai.use(chaiHttp);

var expect = chai.expect;

var serverPort = 3000;
var serverName = 'localhost:' + serverPort;

describe('simple rest framework', function () {
	before( function() {
		function testGetRouteHandler(request, response, indexParam) {
			var message = {};
			message.msg = 'hello world';
			message.indexParam = indexParam;
			util.writeSuccess(response, JSON.stringify(message));
		}

		function testPatchRouteHandler(request, response, indexParam) {
			util.getJsonBody(request, response, function (body) {
				body.msg = 'hello world';
				body.indexParam = indexParam;
				util.writeSuccess(response, JSON.stringify(body));
			});
		}

		router.addRoute('/unicorns', 'get', testGetRouteHandler);
		router.addRoute('/unicorns', 'patch', testPatchRouteHandler);

		server.start(serverPort, router.route);
	});

	it('should return json from get request', function(done) {
		chai.request(serverName)
			.get('/unicorns/1')
			.end(function (error, response) {
				expect(error).to.eql(null);
				expect(response).to.have.status(200);
				expect(response.body).to.eql({"msg":"hello world","indexParam":"1"});
				done();
			});
	});

	it('should return updated json from a patch request', function (done) {
		chai.request(serverName)
			.patch('/unicorns/1')
			.send({"title": "some random content"})
			.end(function (error, response) {
				expect(error).to.eql(null);
				expect(response).to.have.status(200);
				expect(response.body).to.eql({"title":"some random content","msg":"hello world","indexParam":"1"});
				done();
			});
	});

	it('should return 404 and json error message for unknown resource', function(done) {
		chai.request(serverName)
			.get('/rainbows/1')
			.end(function (error, response) {
				expect(error).to.eql(null);
				expect(response).to.have.status(404);
				expect(response.body).to.eql({"error":"resource not found"});
				done();
			});
	});

	it('should return 400 and json error message for invalid json request body', function(done) {
		chai.request(serverName)
			.patch('/unicorns/1')
			.send('{"title": "some random content"}asdfasdf')
			.end(function (error, response) {
				expect(error).to.eql(null);
				expect(response).to.have.status(400);
				expect(response.body).to.eql({"error": "bad request: received invalid json"});
				done();
			});
	});
});