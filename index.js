const express = require('express');
const mongoose = require('mongoose');
const config = require('config');
const morgan = require('morgan');
const bodyParser = require('body-parser');

const Injector = require('./injector.js');

// const ExampleMiddleware = require('./src/middleware/ExampleMiddleware');

// Connection URL
// let url = `mongodb://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@localhost:27017/fairgame`;
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

// const exampleMiddleware = new ExampleMiddleware();
// app.use((req, res, next) => { exampleMiddleware.run(req, res, next, 'howdy'); });

new Injector(app);

app.use((error, req, res, next) => {
  console.log('ERROR', error);
  res.status(401).send('yoyoyo');
});

app.listen(5000, () => {
  console.log('Example app listening on port 5000!');
});
