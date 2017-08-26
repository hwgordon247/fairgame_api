class UserService {
  constructor(User, jwt, config) {
    this.User = User;
    this.jwt = jwt;
    this.config = config;
  }

  // TODO test and improve error handling
  getUser(req, res) {
    const { username } = this.jwt.decode(req.headers.authtoken, this.config.secret)._doc; // eslint-disable-line no-underscore-dangle
    this.User.findOne({
      username,
    }, (err, user) => {
      if (err) {
        res.status(400).send({ err });
      } else {
        res.send({ username: user.username });
      }
    });
  }
}

module.exports = UserService;
