import { NextFunction, Request, Response } from 'express';
import ErrorApi from '../utils/errorApi';
export const globalError = (err: ErrorApi, req: Request, res: Response, next: NextFunction) => {
  console.log('err: ', err);
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'Error';
  //   const error = { ...err, status, statusCode };
  //   console.log('error: ', error);

  return res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack,
  });
};
