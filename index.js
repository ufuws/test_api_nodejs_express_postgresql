require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');
const router = require('./routers/index');
const errorHandler = require('./middlewares/errorhandler');
const NotFound = require('./errors/NotFound');

const app = express();

app.listen(process.env.LISTENPORT)

app.use(bodyParser.json());

app.use('/', express.static(__dirname + '/public'));
app.use('/', router);
app.use('*', (req, res, next) => next(new NotFound()));

app.use(errors());
app.use(errorHandler);