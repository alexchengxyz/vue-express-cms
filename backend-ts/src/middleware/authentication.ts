import { Request, Response, NextFunction } from 'express';
import jwt, { TokenExpiredError, JsonWebTokenError } from 'jsonwebtoken';
import CustomError from '../customError';

const authentication = (req: Request, res: Response, next: NextFunction) => {
  // req.cookies 未簽署
  // 取得已簽署的cookie
  const { token } = req.signedCookies;

  if (!token) {
    return next(new CustomError('Authentication invalid', 401));
  }

  jwt.verify(token, process.env.PASSPORT_SECRET || '', (err: JsonWebTokenError | TokenExpiredError | null) => {
    if (err) {
      return next(new CustomError('Authentication invalid', 401));
    }

    return next();
  });

  return undefined;
};

export default authentication;
