const request = require('request');
const config = require('config');

const baseUrl = config.baseUrl;

describe('Routes', () => {
  describe('GET /', () => {
    it('returns status code 200', (done) => {
      request.get(baseUrl, (error, response, body) => {
        expect(error).toBeNull();
        expect(response.statusCode).toBe(200);
        expect(body).toBe('heyehy');
        done();
      });
    });
  });
});
