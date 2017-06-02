const express = require('express');
const app = express();
const mongoose = require('mongoose');
const config = require('config');
const morgan = require('morgan');
const bodyParser = require('body-parser');

const Routes = require('./src/routes/routes');
const Authenticate = require('./src/routes/authenticate');

// Connection URL
// let url = `mongodb://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@localhost:27017/fairgame`;
mongoose.Promise = global.Promise;
mongoose.connect(config.databaseUrl);

app.set('superSecret', config.secret);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(morgan('dev'));

new Routes(app);
new Authenticate(app);

app.listen(3000, () => {
  console.log('Example app listening on port 3000!');
});
