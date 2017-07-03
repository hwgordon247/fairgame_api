class ItemRoutes {
  constructor(app) {
    this.app = app;
    this.routes();
  }

  routes() {
    this.app.get('/items', this.getItems.bind(this));
  }

  getItems(req, res) {
    res.send('hello');
  }
}

module.exports = ItemRoutes;
