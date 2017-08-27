class UserService {
  constructor(User, jwtTokenService) {
    this.User = User;
    this.jwtTokenService = jwtTokenService;
  }

  // TODO test and improve error handling
  getUser(req, res) {
    const { username } = this.jwtTokenService.decode(req);
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
