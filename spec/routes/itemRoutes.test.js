const request = require('request');
const config = require('config');
const baseUrl = config.baseUrl;
const Item = require('../../src/models/ItemModel');

const name = 'blesbok';
const description = 'sick animal';

describe('Item', () => {
  beforeAll((done) => {
    const item = new Item({ name, description });
    item.save((err) => {
      expect(err).toBeNull();
      done();
    });
  });

  afterAll((done) => {
    Item.remove({}, (err) => {
      expect(err).toBeNull();
      done();
    });
  });

  describe('GET /items', () => {
    it('should return all items in time remaining order', (done) => {
      request.get({
        url: `${baseUrl}items`,
      },
      (error, response, body) => {
        expect(response.statusCode).toBe(200);
        expect(JSON.parse(body).length).toBe(1);
        expect(JSON.parse(body)[0].name).toBe(name);
        done();
      });
    });
  });
});
