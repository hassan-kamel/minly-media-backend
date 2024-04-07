import { NextFunction, Request, Response } from 'express';
import AppError from '../utils/AppError';
export const globalError = (err: AppError, req: Request, res: Response, next: NextFunction) => {
  console.log('err: ', err);

  return res.status(err.statusCode).json({
    error: err,
    message: err.message,
    stack: err.stack
  });
};
