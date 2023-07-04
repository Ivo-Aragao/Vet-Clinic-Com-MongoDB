<<<<<<< HEAD
<<<<<<< HEAD
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
=======
=======
>>>>>>> 7dcf465d79c9d21d48de9665f334d03d79419da6
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../repositories/userRepository");
async function registerUser(req, res) {
    const { email, password } = req.body;
  
    if (!email || !password) {
      return res.status(400).json({ msg: "Email e senha são obrigatórios" });
    }
  
    try {
      const existingUser = await User.findOne({ email });
  
      if (existingUser) {
        return res.status(409).json({ msg: "O usuário já está registrado" });
      }
  
      const newUser = new User({ email });
  
      const hashedPassword = await bcrypt.hash(password, 10);
      newUser.password = hashedPassword;
  
      await newUser.save();
  
      res.status(201).json({ msg: "Usuário registrado com sucesso" });
    } catch (error) {
      console.error("Erro ao registrar o usuário:", error);
      res.status(500).json({ msg: "Erro ao registrar o usuário" });
    }
  }


async function loginUser(req, res) {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ msg: "Email e senha são obrigatórios" });
  }

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ msg: "Credenciais inválidas" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ msg: "Credenciais inválidas" });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);

    res.status(200).json({ token });
  } catch (error) {
    console.error("Erro ao autenticar o usuário:", error);
    res.status(500).json({ msg: "Erro ao autenticar o usuário" });
  }
}

<<<<<<< HEAD
module.exports = { registerUser, loginUser };
>>>>>>> 7dcf465d79c9d21d48de9665f334d03d79419da6
=======
module.exports = { registerUser, loginUser };
>>>>>>> 7dcf465d79c9d21d48de9665f334d03d79419da6
