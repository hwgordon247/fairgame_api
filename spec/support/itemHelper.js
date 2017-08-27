const Item = require('../../src/models/ItemModel');
const userHelper = require('../support/userHelper');

class ItemHelper {
  constructor() {
    this.items = {};
  }

  createItem(name, description, id, ownerId, done) {
    const item = new Item({
      name,
      description,
      ownedBy: userHelper.getUser(ownerId)._id });
    item.save((err) => {
      expect(err).toBeNull();
      this.setItem(item, id);
      done();
    });
  }

  deleteAllItems(done) {
    Item.remove({}, (err) => {
      expect(err).toBeNull();
      done();
    });
  }

  setItem(item, id) {
    this.items[id] = item;
  }

  getItem(id) {
    return this.items[id];
  }
}

module.exports = new ItemHelper();
