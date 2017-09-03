class ItemService {
  constructor(Item, jwtTokenService, User) {
    this.Item = Item;
    this.User = User;
    this.jwtTokenService = jwtTokenService;
  }

  getItems(req, res) {
    this.Item.find({})
    .populate('ownedBy')
    .exec((err, items) => {
      res.send(items);
    });
  }

  createItem(req, res) {
    const { _id } = this.jwtTokenService.decode(req);
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

  getItemsByUsername(req, res) {
    this.User.findOne({
      username: req.params.username,
    })
    .exec((err, user) => {
      this.Item
      .find({
        ownedBy: user.id,
      })
      .populate('ownedBy')
      .exec((error, items) => {
        res.send(items);
      });
    });
  }

  getItemById(req, res) {
    this.Item.findOne({
      _id: req.params.id,
    })
    .exec((err, item) => {
      if (item) {
        res.send(item);
      } else {
        res.status(404).send({ error: 'Item not found.' })
      }
    });
  }
}

module.exports = ItemService;
