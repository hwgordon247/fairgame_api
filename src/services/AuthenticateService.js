class AuthenticateService {

  constructor(User, jwt, config) {
    this.User = User;
    this.jwt = jwt;
    this.config = config;
  }

  authenticate(req, res) {
    this.User.findOne({
      username: req.body.username,
    }, (err, user) => {
      if (err) throw err;

      if (!user) {
        res.json({ success: false, message: 'Authentication failed. User not found.' });
      } else if (user) {
        // check if password matches
        if (user.password !== req.body.password) {
          res.json({ success: false, message: 'Authentication failed. Wrong password.' });
        } else {
          // if user is found and password is right
          // create a token
          const token = this.jwt.sign(user, this.config.secret, {
            expiresIn: 60 * 60 * 24,
          });

          // return the information including token as JSON
          res.json({
            success: true,
            message: 'Enjoy your token!',
            token,
          });
        }
      }
    });
  }
}

module.exports = AuthenticateService;
