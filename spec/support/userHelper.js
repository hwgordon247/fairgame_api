const User = require('../../src/models/UserModel');
const jwt = require('jsonwebtoken');
const config = require('config');

class UserHelper {
  constructor() {
    this.username = 'Boaty Mc BoatFace';
    this.password = 'Password123';
    this.email = 'dude@legend.com';
  }

  createUser(done) {
    const user = new User({
      email: this.email,
      username: this.username,
      password: this.password,
    });
    user.save((error) => {
      expect(error).toBeNull();
      const token = jwt.sign(user, config.secret, {
        expiresIn: 60 * 60 * 24,
      });
      this.setToken(token);
      this.setUser(user);
      done();
    });
  }

  deleteAllUsers(done) {
    User.remove({}, (error) => {
      expect(error).toBeNull();
      done();
    });
  }

  getUser() {
    return this.storedUser;
  }

  getToken() {
    return this.storedToken;
  }

  setUser(newUser) {
    this.storedUser = newUser;
  }

  setToken(newToken) {
    this.storedToken = newToken;
  }
}

module.exports = new UserHelper();
