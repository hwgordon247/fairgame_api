class ItemRoutes {
  constructor(app, itemService) {
    this.app = app;
    this.itemService = itemService;
    this.routes();
  }

  routes() {
    this.app.get('/items', this.getItems.bind(this));
  }

  getItems(req, res) {
    this.itemService.getItems(req, res);
  }
}

module.exports = ItemRoutes;
