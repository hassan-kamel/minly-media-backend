import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import asyncHandler from 'express-async-handler';

import ErrorApi from '../shared/utils/errorApi';
import createToken from '../shared/utils/createToken';
import { prisma } from '../shared/utils/prismaClient';
import { IUser } from '../shared/interfaces/user';
import { NextFunction, Request, Response } from 'express';

const { compare } = bcrypt;
const { verify } = jwt;

export const signup = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
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

export const login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;
  // 2) check if user exist & check if password is correct
  const user = await prisma.user.findUnique({ where: { email } });
  console.log('user: ', user);

  if (!user || !(await compare(password, user.password))) {
    return next(new ErrorApi('Incorrect email or password', 401));
  }
  // 3) generate token
  const token = createToken(user);
  // 4) send response to client side
  res.status(200).json({ user: { ...user, password: undefined }, token });
});
