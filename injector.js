const jwt = require('jsonwebtoken');
const config = require('config');

const Routes = require('./src/routes/routes');
const AuthenticateRoutes = require('./src/routes/AuthenticateRoutes');

const AuthenticateService = require('./src/services/AuthenticateService');

const User = require('./src/models/UserModel');

class Injector {
  constructor(app) {
    const authenticateService = new AuthenticateService(User, jwt, config);

    new Routes(app);
    new AuthenticateRoutes(app, authenticateService);
  }
}

module.exports = Injector;
