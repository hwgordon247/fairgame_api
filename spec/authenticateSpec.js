const request = require('request');

const baseUrl = 'http://localhost:3000/';
// const config = require('config');
const User = require('../src/models/user');

describe('Authenticate', () => {
  beforeEach(() => {
    process.env.NODE_ENV = 'test';

    const testUser = new User({
      name: 'dude',
      username: 'heyhey',
      password: 'Password123',
    });

    testUser.save((err) => {
      if (err) console.log(err);
      console.log('saved');
    });
  });

  describe('POST /authenticate', () => {
    const userData = {
      username: 'dududuee',
      password: 'kkkkk',
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
