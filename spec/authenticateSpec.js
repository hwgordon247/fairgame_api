const request = require('request');

const baseUrl = 'http://localhost:3000/';
// const config = require('config');
const User = require('../src/models/user');
const mongoose = require('mongoose');

describe('Authenticate', () => {
  beforeEach(() => {
    process.env.NODE_ENV = 'test';
    mongoose.Promise = global.Promise;
    mongoose.connect('mongodb://localhost:27017/fairgame_test');
    const testUser = new User({
      name: 'dude',
      username: 'heyhey',
      password: 'Password123',
    });
    console.log('HHYEYYEYEYEYEY');
    testUser.save((err) => {
      if (err) console.log(err);
      console.log('saved');
    });
  });

  afterEach(() => {
    User.remove({}, () => {
      console.log('deleted');
    });
  });
  describe('POST /authenticate', () => {
    const userData = {
      username: 'harclass',
      password: 'Password123',
    };

    it('should return jwt token if username and password are correct', (done) => {
      request.post({
        url: `${baseUrl}authenticate`,
        form: userData },
      (error, response, body) => {
        expect(response.statusCode).toBe(200);
        expect(JSON.parse(body).message).toBe('Enjoy your token!');
        done();
      });
    });
  });
});
