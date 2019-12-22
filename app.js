const app = require('express')();
const bodyParser = require('body-parser');
const path = require('path');
const compression = require('compression');
const chalk = require('chalk');
const ip = require('ip');
const config = require('config');
const morgan = require('morgan');
const fs = require('fs');
const port = config.get('serverport');

const routes = require('./routes');
const middlewares = require('./middlewares')

app.use(morgan('common', {
	stream: fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' })
}));

app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
	res.send('Hello world...');
});

app.use(routes);

// error hndlers

app.use(middlewares.jsonSchemaValidator);

app.use(middlewares.serverErrorHandler);

const divider = chalk.gray('\n-----------------------------------------------------------');

app.listen(port, () => {
	console.log(`${chalk.bold('Access URLs:')}${divider}
	Localhost: ${chalk.magenta(`http://localhost:${port}`)}
	On Your Network: ${chalk.magenta(`http://${ip.address()}:${port}`)}${divider}
	`);
});
