class ItemRoutes {
  constructor(app, itemService, ensureAuthenticatedMiddleware) {
    this.app = app;
    this.itemService = itemService;
    this.authMiddleware = ensureAuthenticatedMiddleware.check;
    this.routes();
  }

  routes() {
    this.app.get('/items', this.getItems.bind(this));
    this.app.get('/items/:username', this.getItemsByUsername.bind(this));
    this.app.get('/item/:id', this.getItemById.bind(this));
    this.app.post('/create-item', this.authMiddleware.bind(this), this.createItem.bind(this));
  }

  getItems(req, res) {
    this.itemService.getItems(req, res);
  }

  getItemsByUsername(req, res) {
    this.itemService.getItemsByUsername(req, res);
  }

  getItemById(req, res) {
    this.itemService.getItemById(req, res);
  }

  createItem(req, res) {
    this.itemService.createItem(req, res);
  }
}

module.exports = ItemRoutes;
