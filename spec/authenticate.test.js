const request = require('request');
const config = require('config');
const baseUrl = config.baseUrl;
const User = require('../src/models/user');

const name = 'dude';
const username = 'Boaty Mc BoatFace';
const password = 'Password123';

describe('Authenticate', () => {
  beforeAll((done) => {
    const testUser = new User({ name, username, password });
    testUser.save((err) => {
      expect(err).toBeNull();
      done();
    });
  });

  afterAll((done) => {
    User.remove({}, (err) => {
      expect(err).toBeNull();
      done();
    });
  });

  describe('POST /authenticate', () => {
    const userData = { username, password };

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
