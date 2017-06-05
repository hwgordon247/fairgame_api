const mongoose = require('mongoose');
const config = require('config');

beforeAll(() => {
  mongoose.Promise = global.Promise;
  mongoose.connect(config.databaseUrl);
});
