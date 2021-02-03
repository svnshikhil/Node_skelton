require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const init = require('./init');
const syslog = require('./src/services/log');

syslog.info('Initalizing NodeJs API');
const app = express();

app.use(express.static('public'));

app
  .set('trust proxy', true)
  .use(bodyParser.json())
  .use(bodyParser.urlencoded({ extended: false }))
  .use(cors({
    credentials: true,
    origin: [
      'https://myapp.com',
      /\.myapp\.com$/,
      'http://localhost:8081',
      'http://localhost:3000',
      '192.168.1.19:8081',
      '192.168.1.19:3000',
    ],
  }));

// App entry point
app.get('/health', (req, res) => res.status(200).send('OK'));

if (process.env.NODE_ENV !== 'development') {
  app.disable('x-powered-by');
}

init(app);
app.listen(process.env.PORT, () => {
  syslog.info(`NodeJs API ${process.env.VERSION} initialization complete. Listening on ${process.env.PORT}`);
  syslog.info(`Environment ${process.env.NODE_ENV}`);
});

module.exports = app;
