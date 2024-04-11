import { Request, Response } from 'express';
import AppError from '../utils/AppError';
import multer from 'multer';
import { StatusCodes } from '../utils/StatusCodes';
export const globalError = (err: AppError, req: Request, res: Response) => {
  console.log('err: ', err);

  if (err instanceof multer.MulterError) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      error: err,
      message: 'file size limit exceeded, maximum file size is 100MB',
      stack: err.stack
    });
  }

  return res.status(err.statusCode).json({
    error: err,
    message: err.message,
    stack: err.stack
  });
};
