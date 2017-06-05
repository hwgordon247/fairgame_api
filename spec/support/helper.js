const User = require('../../src/models/user');
const mongoose = require('mongoose');

beforeAll((done) => {
  mongoose.Promise = global.Promise;
  mongoose.connect('mongodb://localhost:27017/fairgame_test');
  const testUser = new User({
    name: 'dude',
    username: 'heyhey',
    password: 'Password123',
  });
  testUser.save((err) => {
    if (err) console.log(err);
    console.log('saved');
    done();
  });
});

afterAll((done) => {
  User.remove({}, () => {
    console.log('deleted');
    done();
  });
});
