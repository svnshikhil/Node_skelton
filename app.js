const app = require('express')();
const bodyParser = require('body-parser');
const path = require('path');
const compression = require('compression');
const chalk = require('chalk');
const ip = require('ip');
const config = require('config');
const port = config.get('serverport')
const host = config.get('host')
var logger = require('morgan');


// Routes
const sample = require('./routes/sample.js')

app.use(logger('dev'));
app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.get('/', function (req, res) {
	res.send("Hello world...");
});

app.use('/sample', sample);
// error hndlers

app.use(function (req, res, next) {
	var err = new Error('Not Found');
	err.status = 404;
	next("Not found");
});


app.use(function (err, req, res, next) {

	var responseData;

	if (err.name === 'JsonSchemaValidation') {
		// Log the error however you please 
		console.log(err.message);
		// logs "express-jsonschema: Invalid data found" 

		// Set a bad request http response status or whatever you want 
		res.status(400);

		// Format the response body however you want 
		responseData = {
			statusText: 'Bad Request',
			jsonSchemaValidation: true,
			validations: err.validations  // All of your validation information 
		};

		// Take into account the content type if your app serves various content types 
		if (req.xhr || req.get('Content-Type') === 'application/json') {
			res.json(responseData);
		} else {
			// If this is an html request then you should probably have 
			// some type of Bad Request html template to respond with 
			res.json(responseData);
		}
	} else {
		// pass error to next error middleware handler 
		next(err);
	}
});

app.use(function (err, req, res) {
	res.status(err.status || 500);
	res.end(JSON.stringify({
		message: err.message,
		error: {}
	}));
});
const divider = chalk.gray('\n-----------------------------------------------------------');
app.listen(port, () => {
	console.log(`${chalk.bold('Access URLs:')}${divider}
	Localhost: ${chalk.magenta(`http://localhost:${port}`)}
	On Your Network: ${chalk.magenta(`http://${ip.address()}:${port}`)}${divider}
		  `);
});
