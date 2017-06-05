const Router = require('./router');
const User = require.main.require('./src/models/user');

class Routes extends Router {

  get routes() {
    return new Map([
      ['GET /', 'index'],
      ['GET /hey', 'hey'],
      ['GET /store', 'store'],
      ['GET /list', 'list'],
    ]);
  }

  index(req, res) {
    res.send('heyehy');
  }

  hey(req, res) {
    res.send('woolololoooo');
  }

  store(req, res) {
    const chris = new User(req.query);

    chris.save((err) => {
      if (err) console.log(err);
      res.send('yo');
    });
  }

  list(req, res) {
    User.find({}, (err, users) => {
      if (err) console.log(err);
      res.send(users);
    });
  }
}

module.exports = Routes;
