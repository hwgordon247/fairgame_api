const jwt = require('jsonwebtoken');
const config = require('config');

const AuthenticateRoutes = require('./src/routes/AuthenticateRoutes');
const UserRoutes = require('./src/routes/UserRoutes');
const ItemRoutes = require('./src/routes/ItemRoutes');

const AuthenticateService = require('./src/services/AuthenticateService');
const UserService = require('./src/services/UserService');
const ItemService = require('./src/services/ItemService');
const JwtTokenService = require('./src/services/JwtTokenService');

const User = require('./src/models/UserModel');
const Item = require('./src/models/ItemModel');

const EnsureAuthenticatedMiddleware = require('./src/middleware/EnsureAuthenticatedMiddleware');

class Injector {
  constructor(app) {
    const jwtTokenService = new JwtTokenService(jwt, config);
    const authenticateService = new AuthenticateService(User, jwtTokenService);
    const userService = new UserService(User, jwtTokenService);
    const itemService = new ItemService(Item, jwtTokenService);

    const ensureAuthenticatedMiddleware = new EnsureAuthenticatedMiddleware(jwt, config);

    new AuthenticateRoutes(app, authenticateService);
    new UserRoutes(app, userService);
    new ItemRoutes(app, itemService, ensureAuthenticatedMiddleware);
  }
}

module.exports = Injector;
