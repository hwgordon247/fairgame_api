const mongoose = require('mongoose');
const config = require('config');
const userHelper = require('./userHelper');
const itemHelper = require('./itemHelper');

beforeAll((done) => {
  console.log('start');
  mongoose.Promise = global.Promise;
  mongoose.connect(config.databaseUrl);
  userHelper.createUser(done);
});

beforeAll((done) => {
  console.log('second');
  itemHelper.createItem(done);
});

afterAll((done) => {
  itemHelper.deleteAllItems(done);
});

afterAll((done) => {
  userHelper.deleteAllUsers(done);
});
