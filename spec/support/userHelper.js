const User = require('../../src/models/UserModel');
const jwt = require('jsonwebtoken');
const config = require('config');

class UserHelper {
  constructor() {
    this.storedUsers = {};
    this.storedTokens = {};
  }

  createUser(username, email, password, id, done) {
    const user = new User({
      email,
      username,
      password,
    });
    user.save((error) => {
      expect(error).toBeNull();
      const token = jwt.sign(user, config.secret, {
        expiresIn: 60 * 60 * 24,
      });
      this.setToken(token, id);
      this.setUser(user, id);
      done();
    });
  }

  deleteAllUsers(done) {
    User.remove({}, (error) => {
      expect(error).toBeNull();
      done();
    });
  }

  getUser(id) {
    return this.storedUsers[id];
  }

  getToken(id) {
    return this.storedTokens[id];
  }

  setUser(newUser, id) {
    this.storedUsers[id] = newUser;
  }

  setToken(newToken, id) {
    this.storedTokens[id] = newToken;
  }
}

module.exports = new UserHelper();
