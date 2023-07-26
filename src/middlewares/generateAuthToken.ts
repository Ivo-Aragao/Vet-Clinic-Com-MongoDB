import jwt from 'jsonwebtoken';

function generateAuthToken(userId: string): string {
  const token = jwt.sign({ userId }, process.env.ACCESS_TOKEN_SECRET || 'secretkey');
  return token;
}

export default generateAuthToken;
