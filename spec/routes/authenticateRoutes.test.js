const request = require('request');
const config = require('config');
const baseUrl = config.baseUrl;
const User = require('../../src/models/UserModel');

const email = 'dude@legend.com';
const username = 'Boaty Mc BoatFace';
const password = 'Password123';

describe('Authenticate', () => {
  // beforeAll((done) => {
  //   const testUser = new User({ email, username, password });
  //   testUser.save((err) => {
  //     expect(err).toBeNull();
  //     done();
  //   });
  // });

  afterAll((done) => {
    User.remove({}, (err) => {
      expect(err).toBeNull();
      done();
    });
  });

  describe('POST /register', () => {
    const userData = { email, username, password };
    it('should register a user and return a jwt', (done) => {
      request.post({
        url: `${baseUrl}register`,
        form: userData,
      },
      (error, response, body) => {
        expect(error).toBeNull();
        expect(response.statusCode).toBe(200);
        expect(JSON.parse(body).message).toBe('Welcome to the App');
        done();
      });
    });

    it('should throw an error if user is already registered', (done) => {
      request.post({
        url: `${baseUrl}register`,
        form: userData,
      },
      (error, response, body) => {
        expect(response.statusCode).toBe(400);
        expect(JSON.parse(body).error).toBeDefined();
        done();
      });
    });
  });

  describe('POST /login', () => {
    const userData = { username, password };

    it('should return jwt token if username and password are correct', (done) => {
      request.post({
        url: `${baseUrl}login`,
        form: userData,
      },
      (error, response, body) => {
        expect(response.statusCode).toBe(200);
        expect(JSON.parse(body).message).toBe('Enjoy your token!');
        done();
      });
    });
  });
});
