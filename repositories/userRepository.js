<<<<<<< HEAD
<<<<<<< HEAD
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
=======
=======
>>>>>>> 7dcf465d79c9d21d48de9665f334d03d79419da6
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
});

const User = mongoose.model("User", userSchema);

<<<<<<< HEAD
module.exports = User;
>>>>>>> 7dcf465d79c9d21d48de9665f334d03d79419da6
=======
module.exports = User;
>>>>>>> 7dcf465d79c9d21d48de9665f334d03d79419da6
