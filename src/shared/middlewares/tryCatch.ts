import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from '../utils/StatusCodes';
import AppError from '../utils/AppError';

export const tryCatch = (
  controller: (req: Request, res: Response, next: NextFunction) => Promise<void>
) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      controller(req, res, next);
    } catch (error) {
      return next(new AppError('Internal server error', StatusCodes.INTERNAL_SERVER_ERROR, error));
    }
  };
};
