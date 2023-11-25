import jwt from 'jsonwebtoken';

import { PayloadType } from './auth.types';

const SECRET = process.env.SECRET_JWT as string;

export const signToken = (payload: PayloadType) => {
  return jwt.sign(payload, SECRET, { expiresIn: '1d' });
}

export const verifyToken = (token: string) => {
  return jwt.verify(token, SECRET) as PayloadType;
}