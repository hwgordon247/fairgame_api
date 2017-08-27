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
    }, (error, user) => {
      if (error) {
        res.status(400).send({ error });
      } else if (!user) {
        res.status(500).send({ error: 'User not found.' });
      } else {
        res.send({ username: user.username });
      }
    });
  }
}

module.exports = UserService;
