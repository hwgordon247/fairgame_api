class ItemService {
  constructor(Item) {
    this.Item = Item;
  }

  getItems(req, res) {
    this.Item.find({})
    .exec((err, items) => {
      res.send(items);
    });
  }
}

module.exports = ItemService;
