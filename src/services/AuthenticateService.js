class AuthenticateService {

  constructor(User, jwt, config) {
    this.User = User;
    this.jwt = jwt;
    this.config = config;
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
          const token = this.jwt.sign(user, this.config.secret, {
            expiresIn: 60 * 60 * 24,
          });
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
        const token = this.jwt.sign(newUser, this.config.secret, {
          expiresIn: 60 * 60 * 24,
        });
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
