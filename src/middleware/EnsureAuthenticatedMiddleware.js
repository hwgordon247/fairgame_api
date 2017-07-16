class EnsureAuthenticatedMiddleware {
  constructor(jwt, config) {
    this.jwt = jwt;
    this.config = config;
    this.check = this.check.bind(this);
  }

  check(req, res, next) {
    this.jwt.verify(req.headers.authtoken, this.config.secret, (err) => {
      if (err) {
        res.status(401).send();
      } else {
        next();
      }
    });
  }
}

module.exports = EnsureAuthenticatedMiddleware;
