class AuthenticateRoute {
  constructor(app, AuthenticateService, ExampleMiddleware) {
    this.app = app;
    this.authenticateService = AuthenticateService;
    this.ExampleMiddleware = ExampleMiddleware;
    this.authenticateMiddleware = this.authenticateMiddleware.bind(this);
    this.routes();
  }

  routes() {
    this.app.post('/authenticate', this.authenticateMiddleware, this.authenticate.bind(this));
  }

  authenticate(req, res) {
    this.authenticateService.authenticate(req, res);
  }

  authenticateMiddleware(req, res, next) {
    this.ExampleMiddleware.run(req, res, next, 'yoyoyoyoyoy');
  }
}

module.exports = AuthenticateRoute;
