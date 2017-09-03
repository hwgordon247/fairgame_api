const request = require('request');
const config = require('config');
const baseUrl = config.baseUrl;
const Item = require('../../src/models/ItemModel');

const userHelper = require('../support/userHelper');
const itemHelper = require('../support/itemHelper');

const name = 'impala';
const description = 'its a falcon richard';

describe('Item', () => {
  describe('GET /items', () => {
    it('should return all items in time remaining order', (done) => {
      request.get({
        url: `${baseUrl}items`,
      },
      (error, response, body) => {
        expect(error).toBeNull();
        expect(response.statusCode).toBe(200);
        expect(JSON.parse(body).length).toBe(2);
        expect(JSON.parse(body)[0].name).toBe(itemHelper.getItem('first').name);
        expect(JSON.parse(body)[0].ownedBy.username).toBe(userHelper.getUser('first').username);
        done();
      });
    });
  });

  describe('GET /items/:username', () => {
    it('should return all items for the chosen user', (done) => {
      request.get({
        url: `${baseUrl}items/${userHelper.getUser('first').username}`,
      },
      (error, response, body) => {
        expect(error).toBeNull();
        expect(response.statusCode).toBe(200);
        expect(JSON.parse(body).length).toBe(1);
        expect(JSON.parse(body)[0].name).toBe(itemHelper.getItem('first').name);
        expect(JSON.parse(body)[0].ownedBy.username).toBe(userHelper.getUser('first').username);
        done();
      });
    });

    it('should return error if user is not found', (done) => {
      request.get({
        url: `${baseUrl}items/woololo`,
      },
      (error, response, body) => {
        expect(error).toBeNull();
        expect(response.statusCode).toBe(404);
        expect(JSON.parse(body).error).toBe('User not found.');
        done();
      });
    });
  });

  describe('POST /create-item', () => {
    afterAll((done) => {
      Item.findOne({ name })
      .remove({}, (err) => {
        expect(err).toBeNull();
        done();
      });
    });

    it('should create an item', (done) => {
      request.post({
        url: `${baseUrl}create-item`,
        form: {
          name,
          description,
        },
        headers: {
          authtoken: userHelper.getToken('first'),
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

  describe('GET /item/:id', () => {
    it('should return the specific item', () => {
      request.get({
        url: `${baseUrl}item/${itemHelper.getItem('first')._id}`,
      },
      (error, response, body) => {
        expect(error).toBeNull();
        expect(response.statusCode).toBe(200);
        expect(JSON.parse(body).name).toBe(itemHelper.getItem('first').name);
      });
    });

    it('should return an error if the item is not found', () => {
      request.get({
        url: `${baseUrl}item/1234`,
      },
      (error, response, body) => {
        expect(error).toBeNull();
        expect(response.statusCode).toBe(404);
        expect(JSON.parse(body).error).toBe('Item not found.');
      });
    });
  });
});
