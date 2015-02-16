/**
 * Created by kcoleman on 2/15/2015.
 */
'use strict';


function getJsonBody(request, response, callback) {
	var input = '';
	var parsed = {};

	request.on('data', function (data) {
		input += data.toString('utf-8');
	});

	request.on('end', function () {
		try {
			parsed = JSON.parse(input);
		} catch (e) {
			if (e.message.indexOf('Unexpected token') > -1) {
				console.error('received invalid json');
				writeRequestJsonError(response);
			} else {
				console.error('error: ' + e.message);
				writeServerError(response);
			}
		}

		callback(parsed);

	});
}

function writeSuccess(response, message) {
	response.writeHead(200, {
		'Content-Type': 'application/json'
	});
	response.write(message);
	response.end();
}

function writeRequestJsonError(response) {
	response.writeHead(400, {'Content-Type': 'application/json'});
	response.write('{"error": "bad request: received invalid json"}');
	response.end();
}

function writeNotFoundError(response) {
	response.writeHead(404, {'Content-Type': 'application/json'});
	response.write('{"error": "not found: resource not found"}');
	response.end();
}

function writeServerError(response) {
	response.writeHead(500, {'Content-Type': 'application/json'});
	response.write('{"error": "Internal Error: something went wrong with this request"}');
	response.end();
}

exports.getJsonBody = getJsonBody;
exports.writeSuccess = writeSuccess;
exports.writeRequestJsonError = writeRequestJsonError;
exports.writeNotFoundError = writeNotFoundError;
exports.writeServerError = writeServerError;