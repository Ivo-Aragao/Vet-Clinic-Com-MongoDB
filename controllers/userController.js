const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user");


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

module.exports = { registerUser, loginUser };

const express = require("express");
const router = express.Router();
const userService = require("../services/userService");

router.post("/register", userService.registerUser);

router.post("/login", userService.loginUser);

module.exports = router;
