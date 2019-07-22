const express = require('express');
const app = express();
const R = require('r-script');

// -------------------------------------------- controllers
function executeExAsync(callback) {
	const attitude = [
		{ group: '(40,55]', rating: 46.7143, advance: 41.1429 },
		{ group: '(55,70]', rating: 64.6154, advance: 41.9231 },
		{ group: '(70,85]', rating: 77.2, advance: 45.5 }
	];

	R('ex-async.R').data({ df: attitude, nGroups: 3, fxn: 'mean' }).call(function(error, result) {
		if (error) {
			console.error('ex-async throws error', error);
			return callback(err, null);
		}
		console.error('ex-async success result', result);
		return callback(null, result);
	});
}

// -------------------------------------------- routes
app.get('/', function(req, res) {
	res.send('Hello World');
});

app.get('/ex-async', function(req, res) {
	executeExAsync(function(error, result) {
		if (error) {
			return res.status(500).send(error);
		}
		return res.status(200).send(result);
	});
});

// -------------------------------------------- Server Start
const server = app.listen(8081, function() {
	const port = server.address().port;
	console.log(`Example app listening at http://localhost:${port}`);
});
