import { Response } from 'express';
import jwt from 'jsonwebtoken';

/**
 * 設置 Token
 */
const signToken = (id: string, email: string) => {
  const tokenObj = { id, email };

  return jwt.sign(tokenObj, process.env.PASSPORT_SECRET || '', {
    expiresIn: process.env.JWT_LIFETIME,
  });
};

/**
 * 將 JWT 植入cookie內
 */
const jwtToCookies = (token: string, res: Response) => {
  const oneDay = 1000 * 60 * 60 * 24;

  res.cookie('token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'build', // for https
    signed: true,
    expires: new Date(Date.now() + oneDay),
  });
};

export {
  signToken,
  jwtToCookies,
};
