class ItemService {
  constructor(Item, jwt, config) {
    this.Item = Item;
    this.config = config;
    this.jwt = jwt;
  }

  getItems(req, res) {
    this.Item.find({})
    .exec((err, items) => {
      res.send(items);
    });
  }

  createItem(req, res) {
    const { username } = this.jwt.decode(req.headers.authtoken, this.config.secret)._doc; // eslint-disable-line no-underscore-dangle
    const { name, description } = req.body;
    const newItem = new this.Item({
      name,
      description,
      username,
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
