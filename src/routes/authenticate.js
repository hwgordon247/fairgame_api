const Router = require('./router');
const User = require.main.require('./src/models/user');
const jwt = require('jsonwebtoken');

class Authenticate extends Router {
  get routes() {
    return new Map([
      ['POST /authenticate', 'authenticate'],
    ]);
  }

  authenticate(req, res) {
    console.log(req.body);
    User.findOne({
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
          const token = jwt.sign(user, this.app.get('superSecret'), {
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

module.exports = Authenticate;
