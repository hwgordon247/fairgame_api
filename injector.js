const jwt = require('jsonwebtoken');
const config = require('config');

const Routes = require('./src/routes/routes');
const AuthenticateRoutes = require('./src/routes/AuthenticateRoutes');
const UserRoutes = require('./src/routes/UserRoutes');
const ItemRoutes = require('./src/routes/ItemRoutes');

const AuthenticateService = require('./src/services/AuthenticateService');
const UserService = require('./src/services/UserService');
const ItemService = require('./src/services/ItemService');

const User = require('./src/models/UserModel');
const Item = require('./src/models/ItemModel');

const EnsureAuthenticatedMiddleware = require('./src/middleware/EnsureAuthenticatedMiddleware');

class Injector {
  constructor(app) {
    const authenticateService = new AuthenticateService(User, jwt, config);
    const userService = new UserService(User, jwt, config);
    const itemService = new ItemService(Item, jwt, config);

    const ensureAuthenticatedMiddleware = new EnsureAuthenticatedMiddleware(jwt, config);

    new Routes(app);
    new AuthenticateRoutes(app, authenticateService);
    new UserRoutes(app, userService);
    new ItemRoutes(app, itemService, ensureAuthenticatedMiddleware);
  }
}

module.exports = Injector;
