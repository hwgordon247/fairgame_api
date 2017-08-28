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
  userHelper.createUser('BoatyMcBoatFace', 'dude@legend.com', 'Password123', 'first', done);
});

// Create 2nd user
beforeAll((done) => {
  userHelper.createUser('Kieth', 'rolling@stones.com', 'Password123', 'second', done);
});

// Create 1st item belonging to 1st User
beforeAll((done) => {
  itemHelper.createItem('blesbok', 'sik animal', 'first', 'first', done);
});

// Create 2nd item belonging to 2nd User
beforeAll((done) => {
  itemHelper.createItem('elephant', 'big boy', 'second', 'second', done);
});

afterAll((done) => {
  itemHelper.deleteAllItems(done);
});

afterAll((done) => {
  userHelper.deleteAllUsers(done);
});
