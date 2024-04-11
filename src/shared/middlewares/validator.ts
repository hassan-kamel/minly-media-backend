import { Request, Response, NextFunction } from 'express';
import { AnyZodObject, ZodError } from 'zod';
import { StatusCodes } from '../utils/StatusCodes';
import AppError from '../utils/AppError';

export const validate =
  (schema: AnyZodObject) => async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.parseAsync({
        body: req.body,
        query: req.query,
        params: req.params
      });
      return next();
    } catch (error: ZodError | unknown) {
      console.log('error: ', error);
      return next(
        new AppError('Validation error', StatusCodes.BAD_REQUEST, (error as ZodError).issues)
      );
    }
  };
