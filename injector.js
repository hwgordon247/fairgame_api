const jwt = require('jsonwebtoken');
const config = require('config');

const Routes = require('./src/routes/routes');
const AuthenticateRoutes = require('./src/routes/AuthenticateRoutes');
const UserRoutes = require('./src/routes/UserRoutes');

const AuthenticateService = require('./src/services/AuthenticateService');
const UserService = require('./src/services/UserService');

const User = require('./src/models/UserModel');

const ExampleMiddleware = require('./src/middleware/ExampleMiddleware');

class Injector {
  constructor(app) {
    const authenticateService = new AuthenticateService(User, jwt, config);
    const userService = new UserService(User, jwt, config);

    const exampleMiddleware = new ExampleMiddleware();

    new Routes(app);
    new AuthenticateRoutes(app, authenticateService, exampleMiddleware);
    new UserRoutes(app, userService);
  }
}

module.exports = Injector;
