import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';
import CustomError from '../customError';

const errorHandler = (
  err: CustomError,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const errors = validationResult(req).array();

  // validation error
  if (errors.length) {
    return res
      .status(400)
      .json({
        result: 'error',
        msg: errors.map((e) => e.msg),
      });
  }

  if (err instanceof CustomError) {
    return res
      .status(err.statusCode || 500)
      .json({
        result: 'error',
        msg: err.message,
      });
  }

  return res.status(500).json({
    result: 'error',
    msg: 'Something went wrong, please try again',
  });
};

export default errorHandler;
