class Authenticate {
  constructor(app, AuthenticateService, ExampleMiddleware) {
    this.app = app;
    this.authenticateService = AuthenticateService;
    this.ExampleMiddleware = ExampleMiddleware;
    this.routes();
  }

  routes() {
    this.app.post('/authenticate', this.authenticateMiddleware.bind(this), this.authenticate.bind(this));
  }

  authenticate(req, res) {
    this.authenticateService.authenticate(req, res);
  }

  authenticateMiddleware(req, res, next) {
    new this.ExampleMiddleware(req, res, next, 'yoyoyoyoyoy');
  }
}

module.exports = Authenticate;
