const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
const app = express();
const routes = require('./routes/index');
const { logErrors, wrapErrors, errorHandler } = require("./middlewares/ErrorHandler");

require('./db');

app.use(cors({ origin: '*' }));
app.use(helmet());
app.use(express.urlencoded({ extended: true, limit: '70mb' }));
app.use(express.json({ limit: '70mb' }));
app.use(express.static('public'));

app.use('/', routes);

app.use(logErrors);
app.use(wrapErrors);
app.use(errorHandler);

module.exports = app;