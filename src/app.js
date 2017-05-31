const express = require('express')
const app = express()

// var MongoClient = require('mongodb').MongoClient
let mongoose = require('mongoose');
let User = require('./models/user');

// Connection URL
// let url = `mongodb://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@localhost:27017/fairgame`;
let url = 'mongodb://localhost:27017/fairgame';
mongoose.Promise = global.Promise;
mongoose.connect(url);

app.get('/', function (req, res) {
  res.send('Hello World!')
})

app.get('/store', function (req, res) {
  let chris = new User(req.query);

  chris.save(err => {
    if (err) console.log(err)
    res.send('yo')
  })
})

app.get('/list', (req, res) => {
  User.find({}, (err, users) => {
    if (err) console.log(err)
    res.send(users)
  })
})

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})
