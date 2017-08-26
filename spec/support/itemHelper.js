const Item = require('../../src/models/ItemModel');
const userHelper = require('../support/userHelper');

class ItemHelper {
  constructor() {
    this.name = 'blesbok';
    this.description = 'sick animal';
  }

  createItem(done) {
    const item = new Item({
      name: this.name,
      description: this.description,
      ownedBy: userHelper.getUser()._id });
    item.save((err) => {
      expect(err).toBeNull();
      this.setItem(item);
      done();
    });
  }

  deleteAllItems(done) {
    Item.remove({}, (err) => {
      expect(err).toBeNull();
      done();
    });
  }

  setItem(item) {
    this.item = item;
  }

  getItem() {
    return this.item;
  }
}

module.exports = new ItemHelper();
