const request = require('request');
const config = require('config');
const baseUrl = config.baseUrl;
const User = require('../../src/models/UserModel');
const jwt = require('jsonwebtoken');

const username = 'Boaty Mc BoatFace';
const password = 'Password123';
const email = 'dude@legend.com';
let token;

describe('User', () => {
  beforeAll((done) => {
    const user = new User({ email, username, password });
    user.save((err) => {
      expect(err).toBeNull();
      token = jwt.sign(user, config.secret, {
        expiresIn: 60 * 60 * 24,
      });
      done();
    });
  });

  afterAll((done) => {
    User.remove({}, (err) => {
      expect(err).toBeNull();
      done();
    });
  });

  describe('GET /user', () => {
    it('should return the current user', (done) => {
      request.get({
        url: `${baseUrl}user`,
        headers: {
          authtoken: token,
        },
      },
      (error, response, body) => {
        expect(response.statusCode).toBe(200);
        expect(JSON.parse(body).username).toBe(username);
        expect(JSON.parse(body).password).not.toBeDefined();
        done();
      });
    });
  });
});
