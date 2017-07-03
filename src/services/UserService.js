class UserService {
  constructor(User, jwt, config) {
    this.User = User;
    this.jwt = jwt;
    this.config = config;
  }

  getUser(req, res) {
    const { username } = this.jwt.decode(req.headers.authtoken, this.config.secret)._doc; // eslint-disable-line no-underscore-dangle
    this.User.findOne({
      username,
    }, (err, user) => {
      res.send(user);
    });
  }
}

module.exports = UserService;
