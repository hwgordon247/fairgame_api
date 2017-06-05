const request = require('request');

const baseUrl = 'http://localhost:3000/';

describe('Authenticate', () => {
  describe('POST /authenticate', () => {
    const userData = {
      username: 'heyhey',
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
