const app = require('express')();
const bodyParser = require('body-parser');
const path = require('path');
const compression = require('compression');
const chalk = require('chalk');
const ip = require('ip');
const config = require('config');
const port = config.get('serverport')
const host = config.get('host')

// Routes
const getData = require('./routes/getData.js')

app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.get('/', function (req, res) {
	res.send("Hello world...");
});
app.use('/getData', getData);

const divider = chalk.gray('\n-----------------------------------------------------------');
app.listen(port, () => {
	console.log(`${chalk.bold('Access URLs:')}${divider}
	Localhost: ${chalk.magenta(`http://localhost:${port}`)}
	On Your Network: ${chalk.magenta(`http://${ip.address()}:${port}`)}${divider}
		  `);
});
