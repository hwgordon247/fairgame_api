class ItemRoutes {
  constructor(app, itemService, ensureAuthenticatedMiddleware) {
    this.app = app;
    this.itemService = itemService;
    this.authMiddleware = ensureAuthenticatedMiddleware.check;
    this.routes();
  }

  routes() {
    this.app.get('/items', this.getItems.bind(this));
    this.app.post('/create-item', this.authMiddleware.bind(this), this.createItem.bind(this));
    this.app.get('/user-items', this.authMiddleware.bind(this), this.getUserItems.bind(this));
  }

  getItems(req, res) {
    this.itemService.getItems(req, res);
  }

  createItem(req, res) {
    this.itemService.createItem(req, res);
  }

  getUserItems(req, res) {
    this.itemService.getUserItems(req, res);
  }
}

module.exports = ItemRoutes;
