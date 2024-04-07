import { NextFunction, Request, Response } from 'express';
import bcrypt from 'bcryptjs';

import AppError from '../shared/utils/AppError';
import createToken from '../shared/utils/createToken';
import { prisma } from '../shared/utils/prismaClient';
import { IUser } from '../shared/interfaces/user';
import { tryCatch } from '../shared/middlewares/tryCatch';
import { StatusCodes } from '../shared/utils/StatusCodes';

const { compare } = bcrypt;

export const signup = tryCatch(async (req: Request, res: Response) => {
  // 1- Create user
  const { fullName, email, password } = req.body;
  const user: IUser = await prisma.user.create({
    data: {
      fullName,
      email,
      password
    }
  });
  console.log('user: ', user);

  // 2- Generate token
  const token = createToken(user);

  res.status(201).json({ user: { ...user, password: undefined }, token });
});

export const login = tryCatch(async (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;
  // 2) check if user exist & check if password is correct
  const user = await prisma.user.findUnique({ where: { email } });
  console.log('user: ', user);

  if (!user || !(await compare(password, user.password))) {
    return next(
      new AppError('Incorrect email or password', StatusCodes.UNAUTHORIZED, 'wrong credentials')
    );
  }
  // 3) generate token
  const token = createToken(user);
  // 4) send response to client side
  res.status(200).json({ user: { ...user, password: undefined }, token });
});
