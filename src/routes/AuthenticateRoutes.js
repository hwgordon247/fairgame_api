const Router = require('./Router');

class Authenticate extends Router {
  constructor(app, AuthenticateService) {
    super(app);
    this.authenticateService = AuthenticateService;
  }

  get routes() {
    return new Map([
      ['POST /authenticate', 'authenticate'],
    ]);
  }

  authenticate(req, res) {
    this.authenticateService.authenticate(req, res);
  }
}

module.exports = Authenticate;
