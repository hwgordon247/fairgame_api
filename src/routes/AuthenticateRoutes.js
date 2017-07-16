class AuthenticateRoutes {
  constructor(app, AuthenticateService, ExampleMiddleware) {
    this.app = app;
    this.authenticateService = AuthenticateService;
    this.ExampleMiddleware = ExampleMiddleware;
    this.routes();
  }

  routes() {
    this.app.post('/login', this.authenticate.bind(this));
    this.app.post('/register', this.register.bind(this));
  }

  authenticate(req, res) {
    this.authenticateService.login(req, res);
  }

  register(req, res) {
    this.authenticateService.register(req, res);
  }

  authenticateMiddleware(req, res, next) {
    this.ExampleMiddleware.run(req, res, next, 'yoyoyoyoyoy');
  }
}

module.exports = AuthenticateRoutes;
