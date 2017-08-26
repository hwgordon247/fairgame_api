const mongoose = require('mongoose');
const config = require('config');
const userHelper = require('./userHelper');

beforeAll((done) => {
  mongoose.Promise = global.Promise;
  mongoose.connect(config.databaseUrl);
  userHelper.createUser(done);
});

afterAll((done) => {
  userHelper.deleteAllUsers(done);
});
