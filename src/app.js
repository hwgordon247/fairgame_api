const express = require('express')
const app = express()

var MongoClient = require('mongodb').MongoClient

// Connection URL
// var url = `mongodb://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@localhost:27017/fairgame`;
var url = `mongodb://localhost:27017/fairgame`;

// Use connect method to connect to the server
MongoClient.connect(url, function(err, db) {
  console.log("Connected successfully to server");

  insertDocuments(db, function() {
    findDocuments(db, function() {
      db.close();
    });
  });
});

app.get('/', function (req, res) {
  res.send('Hello World!')
})

app.get('/store', function (req, res) {
  res.send('yo')
})

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})

var insertDocuments = function(db, callback) {
  // Get the documents collection
  var collection = db.collection('documents');
  // Insert some documents
  collection.insertMany([
    {a : 1}, {a : 2}, {a : 3}
  ], function(err, result) {
    console.log("Inserted 3 documents into the collection");
    callback(result);
  });
}

var findDocuments = function(db, callback) {
  // Get the documents collection
  var collection = db.collection('documents');
  // Find some documents
  collection.find({}).toArray(function(err, docs) {
    console.log("Found the following records");
    console.log(docs)
    callback(docs);
  });
}
