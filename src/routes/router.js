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
    let routes = this.routes

    for(let [route, method] of routes) {
      let verb = route.match(/^\w+/g)[0].toLowerCase()
      let path = route.match(/\/(\w+)?$/g)[0]
      this.app[verb](path, this[method].bind(this));
    }
  }
}


module.exports = Router
