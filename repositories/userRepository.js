const User = require('../models/user');

async function getUserByEmail(email) {
  return await User.findOne({ email });
}

async function createUser(userData) {
  const user = new User(userData);
  return await user.save();
}

module.exports = {
  getUserByEmail,
  createUser
};
