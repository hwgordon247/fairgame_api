const express = require('express');
const mongoose = require('mongoose');
const config = require('config');
const morgan = require('morgan');
const bodyParser = require('body-parser');

const Injector = require('./injector.js');

mongoose.Promise = global.Promise;
mongoose.connect(config.databaseUrl);

const app = express();
// app.set('superSecret', config.secret);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(morgan('dev'));

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, authtoken');
  next();
});

new Injector(app);

app.use((error, req, res, next) => { // eslint-disable-line no-unused-vars
  res.status(error.status || 500).send(error);
});

app.listen(config.port, () => {
  console.log(`Example app listening on port ${config.port}!`);
});
