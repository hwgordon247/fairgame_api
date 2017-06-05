const Router = require('./Router');

const AuthenticateService = require.main.require('./src/services/AuthenticateService');

class Authenticate extends Router {
  get routes() {
    return new Map([
      ['POST /authenticate', 'authenticate'],
    ]);
  }

  authenticate(req, res) {
    // const auth = new AuthenticateService();
    AuthenticateService.authenticate(req, res);
  }
}

module.exports = Authenticate;
