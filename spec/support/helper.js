const mongoose = require('mongoose');
const config = require('config');
const userHelper = require('./userHelper');
const itemHelper = require('./itemHelper');

beforeAll((done) => {
  mongoose.Promise = global.Promise;
  mongoose.connect(config.databaseUrl);
  done();
});

// Create 1st user
beforeAll((done) => {
  userHelper.createUser('Boaty Mc BoatFace', 'dude@legend.com', 'Password123', 'first', done);
});

// Create 2nd user
beforeAll((done) => {
  userHelper.createUser('Kieth', 'rolling@stones.com', 'Password123', 'second', done);
});

beforeAll((done) => {
  itemHelper.createItem(done);
});

afterAll((done) => {
  itemHelper.deleteAllItems(done);
});

afterAll((done) => {
  userHelper.deleteAllUsers(done);
});
