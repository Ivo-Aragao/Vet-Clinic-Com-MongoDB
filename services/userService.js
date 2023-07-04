const User = require("../repositories/userRepository");

async function registerUser(email, password) {
  const existingUser = await User.getUserByEmail(email);

  if (existingUser) {
    throw new Error("Email already registered");
  }

  const userData = { email, password };
  return await User.createUser(userData);
}

async function loginUser(email, password) {
  const user = await User.getUserByEmail(email);

  if (!user) {
    throw new Error("Invalid credentials");
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    throw new Error("Invalid credentials");
  }

  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);

  return { token };
}

module.exports = {
  registerUser,
  loginUser
};
