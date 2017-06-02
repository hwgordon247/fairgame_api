class Router {
  get routes() {
    return {};
  }

  constructor(app) {
    this.app = app;
    if (!this.app) throw new Error('Missing app property');

    this.registerRoutes();
  }

  registerRoutes() {
    const routes = this.routes;

    for (const [route, method] of routes) {
      const verb = route.match(/^\w+/g)[0].toLowerCase();
      const path = route.match(/\/(\w+)?$/g)[0];
      this.app[verb](path, this[method].bind(this));
    }
  }
}


module.exports = Router;
