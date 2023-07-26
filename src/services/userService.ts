import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/user";

async function registerUser(email: string, password: string): Promise<void> {
  const existingUser = await User.findOne({ email });

  if (existingUser) {
    throw new Error("O usuário já está registrado");
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = new User({ email, password: hashedPassword });

  await newUser.save();
}

async function loginUser(email: string, password: string): Promise<string> {
  const user = await User.findOne({ email });

  if (!user) {
    throw new Error("Credenciais inválidas");
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    throw new Error("Credenciais inválidas");
  }

  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET || 'secretkey');

  return token;
}

export {
  registerUser,
  loginUser,
};
