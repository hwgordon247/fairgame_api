const request = require('request');
const config = require('config');
const baseUrl = config.baseUrl;
const userHelper = require('../support/userHelper');
const jwt = require('jsonwebtoken');

describe('User', () => {
  describe('GET /user', () => {
    it('should return the current user', (done) => {
      request.get({
        url: `${baseUrl}user`,
        headers: {
          authtoken: userHelper.getToken('first'),
        },
      },
      (error, response, body) => {
        expect(response.statusCode).toBe(200);
        expect(JSON.parse(body).username).toBe(userHelper.getUser('first').username);
        expect(JSON.parse(body).password).not.toBeDefined();
        done();
      });
    });

    it('should return an error if no user is found', (done) => {
      // Generate random token
      const randomToken = jwt.sign({ _doc: { username: 'wooloolooo' } }, config.secret, {
        expiresIn: 60 * 60 * 24,
      });
      request.get({
        url: `${baseUrl}user`,
        headers: {
          authtoken: randomToken,
        },
      },
      (error, response, body) => {
        expect(error).toBeNull();
        expect(response.statusCode).toBe(500);
        expect(JSON.parse(body).error).toBe('User not found.');
        done();
      });
    });
  });
});
