class AuthenticateRoutes {
  constructor(app, AuthenticateService) {
    this.app = app;
    this.authenticateService = AuthenticateService;
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
}

module.exports = AuthenticateRoutes;
