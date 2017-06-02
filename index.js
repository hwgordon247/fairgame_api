const express = require('express');
const app = express();
const mongoose = require('mongoose');
const Routes = require('./src/routes/routes');
const config = require('config');

new Routes(app);

// Connection URL
// let url = `mongodb://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@localhost:27017/fairgame`;
mongoose.Promise = global.Promise;
mongoose.connect(config.databaseUrl);

app.listen(3000, () => {
  console.log('Example app listening on port 3000!');
});
