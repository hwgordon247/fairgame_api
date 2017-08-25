const mongoose = require('mongoose');
const config = require('config');
const User = require('../../src/models/UserModel');
const jwt = require('jsonwebtoken');

const username = 'Boaty Mc BoatFace';
const password = 'Password123';
const email = 'dude@legend.com';
let storedUser;
let storedToken;

const setUser = (newUser) => {
  storedUser = newUser;
};

const setToken = (newToken) => {
  storedToken = newToken;
};

const getUser = () => storedUser;
const getToken = () => storedToken;

beforeAll((done) => {
  mongoose.Promise = global.Promise;
  mongoose.connect(config.databaseUrl);
  const user = new User({ email, username, password });
  user.save((error) => {
    expect(error).toBeNull();
    const token = jwt.sign(user, config.secret, {
      expiresIn: 60 * 60 * 24,
    });
    setToken(token);
    setUser(user);
    done();
  });
});

afterAll((done) => {
  User.remove({}, (error) => {
    expect(error).toBeNull();
    done();
  });
});

module.exports = { getUser, getToken };
