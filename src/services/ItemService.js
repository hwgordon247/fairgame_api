class ItemService {
  constructor(Item, jwtTokenService) {
    this.Item = Item;
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

  getUserItems(req, res) {
    const { _id } = this.jwtTokenService.decode(req);
    this.Item
    .find({
      ownedBy: _id,
    })
    .populate('ownedBy')
    .exec((error, items) => {
      res.send(items);
    });
  }

  getItemsById(req, res) {
    this.Item
    .find({
      ownedBy: req.params.userId,
    })
    .populate('ownedBy')
    .exec((error, items) => {
      res.send(items);
    });
  }
}

module.exports = ItemService;
