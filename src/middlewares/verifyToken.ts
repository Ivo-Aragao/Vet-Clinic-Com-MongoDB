import { Request } from 'express';
import jwt from 'jsonwebtoken';

interface DecodedToken {
  [key: string]: any;
}

function verifyToken(req: Request): DecodedToken {
  const authorizationHeader = req.headers.authorization;
  if (authorizationHeader) {
    const token = authorizationHeader.split(' ')[1];
    try {
      const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET) as DecodedToken;
      return decoded;
    } catch (error) {
      throw new Error('Token inválido');
    }
  } else {
    throw new Error('Token não fornecido');
  }
}

export default verifyToken;