import { Request, Response } from 'express';
import { ErrorMessage } from '../interfaces';

export function errorHandler(err: Error, req: Request, res: Response<ErrorMessage>) {
  const statusCode = res.statusCode !== 200 ? res.statusCode : 500;
  res.status(statusCode);
  res.json({
    message: err.message,
    stack: err.stack,
  });
}
