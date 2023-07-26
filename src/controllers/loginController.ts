import { Request, Response } from 'express';
import * as userService from '../services/userService';


async function loginAuth(req: Request, res: Response): Promise<void> {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400).json({ msg: "Email e senha são obrigatórios" });
    return;
  }

  try {
    const token = await userService.loginUser(email, password);
    res.status(200).json({ token });
  } catch (error) {
    console.error("Erro ao autenticar o usuário:", error);
    res.status(500).json({ msg: "Erro ao autenticar o usuário" });
  }
}

export {
  loginAuth,
};
