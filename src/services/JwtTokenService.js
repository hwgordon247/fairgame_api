class JwtTokenService {
  constructor(jwt, config) {
    this.jwt = jwt;
    this.config = config;
    this.decode = this.decode.bind(this);
  }

  decode(req) {
    return this.jwt.decode(req.headers.authtoken, this.config.secret)._doc;
  }

  sign(user) {
    return this.jwt.sign(user, this.config.secret, {
      expiresIn: 60 * 60 * 24,
    });
  }

  verify() {
    
  }
}

module.exports = JwtTokenService;
