const request = require('request');
const config = require('config');
const baseUrl = config.baseUrl;
const Item = require('../../src/models/ItemModel');

const userHelper = require('../support/userHelper');

const name = 'blesbok';
const description = 'sick animal';

describe('Item', () => {
  describe('GET /items', () => {
    beforeAll((done) => {
      const item = new Item({ name, description, ownedBy: userHelper.getUser()._id });
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

    it('should return all items in time remaining order', (done) => {
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
    afterAll((done) => {
      Item.remove({}, (err2) => {
        expect(err2).toBeNull();
        done();
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
          authtoken: userHelper.getToken(),
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
