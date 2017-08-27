class AuthenticateService {

  constructor(User, jwtTokenService) {
    this.User = User;
    this.jwtTokenService = jwtTokenService;
  }

  login(req, res, next) {
    this.User.findOne({
      username: req.body.username,
    }, (err, user) => {
      if (err) throw err;
      if (!user) {
        next({ error: 'Incorrect username or password', status: 401 });
      } else if (user) {
        if (user.password !== req.body.password) {
          next({ error: 'Incorrect username or password', status: 401 });
        } else {
          const token = this.jwtTokenService.sign(user);
          res.json({
            success: true,
            message: 'Enjoy your token!',
            token,
          });
        }
      }
    });
  }

  register(req, res) {
    const newUser = new this.User(req.body);
    newUser.save((error) => {
      if (error) {
        res.status(400).send({ error });
      } else {
        const token = this.jwtTokenService.sign(newUser);
        res.json({
          success: true,
          message: 'Welcome to the App',
          token,
        });
      }
    });
  }
}

module.exports = AuthenticateService;
