const request = require('request');
const config = require('config');
const baseUrl = config.baseUrl;
const userHelper = require('../support/userHelper');

describe('User', () => {
  describe('GET /user/:username', () => {
    it('should return the current user', (done) => {
      request.get({
        url: `${baseUrl}user/${userHelper.getUser('first').username}`,
      },
      (error, response, body) => {
        expect(response.statusCode).toBe(200);
        expect(JSON.parse(body).username).toBe(userHelper.getUser('first').username);
        expect(JSON.parse(body).email).toBe(userHelper.getUser('first').email);
        expect(JSON.parse(body).password).not.toBeDefined();
        done();
      });
    });

    it('should return an error if no user is found', (done) => {
      request.get({
        url: `${baseUrl}user/woololooo`,
      },
      (error, response, body) => {
        expect(error).toBeNull();
        expect(response.statusCode).toBe(404);
        expect(JSON.parse(body).error).toBe('User not found.');
        done();
      });
    });
  });
});
