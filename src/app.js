const express = require('express')
const app = express()
let mongoose = require('mongoose');
let Routes = require('./routes/routes')

new Routes(app)

// Connection URL
// let url = `mongodb://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@localhost:27017/fairgame`;
let url = 'mongodb://localhost:27017/fairgame';
mongoose.Promise = global.Promise;
mongoose.connect(url);

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})
