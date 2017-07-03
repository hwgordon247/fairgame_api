const request = require('request');
const config = require('config');
const baseUrl = config.baseUrl;

describe('Item', () => {
  beforeAll((done) => {
    done();
  });

  describe('GET /items', () => {
    it('should return all items in time remaining order', (done) => {
      request.get({
        url: `${baseUrl}items`,
      },
      (error, response, body) => {
        expect(response.statusCode).toBe(200);
        expect(body).toBe('some data');
        done();
      });
    });
  });
});
