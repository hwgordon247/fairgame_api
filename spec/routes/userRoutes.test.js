const request = require('request');
const config = require('config');
const baseUrl = config.baseUrl;
const userHelper = require('../support/userHelper');

describe('User', () => {
  describe('GET /user', () => {
    it('should return the current user', (done) => {
      request.get({
        url: `${baseUrl}user`,
        headers: {
          authtoken: userHelper.getToken(),
        },
      },
      (error, response, body) => {
        expect(response.statusCode).toBe(200);
        expect(JSON.parse(body).username).toBe(userHelper.getUser().username);
        expect(JSON.parse(body).password).not.toBeDefined();
        done();
      });
    });
  });
});
