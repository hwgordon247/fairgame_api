const express = require('express');
const mongoose = require('mongoose');
const config = require('config');
const morgan = require('morgan');
const bodyParser = require('body-parser');

const Injector = require('./injector.js');

const ExampleMiddleware = require('./src/middleware/ExampleMiddleware');

// Connection URL
// let url = `mongodb://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@localhost:27017/fairgame`;
mongoose.Promise = global.Promise;
mongoose.connect(config.databaseUrl);


const app = express();
// app.set('superSecret', config.secret);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(morgan('dev'));

app.use((req, res, next) => { new ExampleMiddleware(req, res, next, 'howdy'); });

new Injector(app);

app.listen(3000, () => {
  console.log('Example app listening on port 3000!');
});
