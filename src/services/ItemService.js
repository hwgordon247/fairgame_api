class ItemService {
  constructor(Item, jwt, config) {
    this.Item = Item;
    this.config = config;
    this.jwt = jwt;
  }

  getItems(req, res) {
    this.Item.find({})
    .populate('ownedBy')
    .exec((err, items) => {
      res.send(items);
    });
  }

  createItem(req, res) {
    const { _id } = this.jwt.decode(req.headers.authtoken, this.config.secret)._doc;
    const ownedBy = _id;
    const { name, description } = req.body;
    const newItem = new this.Item({
      name,
      description,
      ownedBy,
    });

    newItem.save((error) => {
      if (error) {
        res.status(400).send({ error });
      } else {
        res.json({
          message: 'Successfully created Item',
        });
      }
    });
  }
}

module.exports = ItemService;
