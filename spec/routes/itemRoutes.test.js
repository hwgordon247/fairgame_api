const request = require('request');
const config = require('config');
const baseUrl = config.baseUrl;
const Item = require('../../src/models/ItemModel');
const User = require('../../src/models/UserModel');
const jwt = require('jsonwebtoken');

const username = 'Boaty Mc BoatFace';
const password = 'Password123';
const email = 'dude@legend.com';
let token;
const name = 'blesbok';
const description = 'sick animal';

describe('Item', () => {
  describe('GET /items', () => {
    beforeAll((done) => {
      const item = new Item({ name, description, ownedBy: '1234' });
      Item.remove({}, (err2) => {
        expect(err2).toBeNull();
        item.save((err) => {
          expect(err).toBeNull();
          done();
        });
      });
    });

    afterAll((done) => {
      Item.remove({}, (err) => {
        expect(err).toBeNull();
        done();
      });
    });

    fit('should return all items in time remaining order', (done) => {
      request.get({
        url: `${baseUrl}items`,
      },
      (error, response, body) => {
        expect(error).toBeNull();
        expect(response.statusCode).toBe(200);
        expect(JSON.parse(body).length).toBe(1);
        expect(JSON.parse(body)[0].name).toBe(name);
        done();
      });
    });
  });

  describe('POST /create-item', () => {
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
        Item.remove({}, (err2) => {
          expect(err2).toBeNull();
          done();
        });
      });
    });

    it('should create an item', (done) => {
      request.post({
        url: `${baseUrl}create-item`,
        form: {
          name: 'blesbok',
          description: 'its a blesbok',
        },
        headers: {
          authtoken: token,
        },
      }, (error, response, body) => {
        expect(error).toBeNull();
        expect(response.statusCode).toBe(200);
        expect(JSON.parse(body).message).toBe('Successfully created Item');
        done();
      });
    });

    it('should return an error if not logged in', (done) => {
      request.post({
        url: `${baseUrl}create-item`,
        form: {
          name: 'impala',
          description: 'its a impala',
        },
      }, (error, response) => {
        expect(error).toBeNull();
        expect(response.statusCode).toBe(401);
        done();
      });
    });
  });
});
