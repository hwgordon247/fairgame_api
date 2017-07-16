class AuthenticateRoutes {
  constructor(app, AuthenticateService) {
    this.app = app;
    this.authenticateService = AuthenticateService;
    this.routes();
  }

  routes() {
    this.app.post('/login', this.login.bind(this));
    this.app.post('/register', this.register.bind(this));
  }

  login(req, res, next) {
    this.authenticateService.login(req, res, next);
  }

  register(req, res) {
    this.authenticateService.register(req, res);
  }
}

module.exports = AuthenticateRoutes;
