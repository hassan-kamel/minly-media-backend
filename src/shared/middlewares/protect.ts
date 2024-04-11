import jwt from 'jsonwebtoken';

import AppError from '../utils/AppError';
import { tryCatch } from './tryCatch';
import { prisma } from '../utils/prismaClient';
import { StatusCodes } from '../utils/StatusCodes';

export const protect = tryCatch(async (req, res, next) => {
  console.log('req.body: ', req.body);
  console.log('req.file: ', req.file);
  // 1) Check if token exist, if exist get
  let token;
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }
  console.log('token: ', token);
  if (!token || token === 'null' || token === 'undefined') {
    return next(
      new AppError('Please login or create an account', StatusCodes.UNAUTHORIZED, 'Unauthorized')
    );
  }

  // 2) Verify token (no change happens, expired token)
  const decoded = await jwt.verify(token, process.env.JWT_SECRET_KEY!);
  console.log('decoded: ', decoded);

  // 3) Check if user exists
  const currentUser = await prisma.user.findUnique({
    where: { id: (decoded as { id: string }).id }
  });
  console.log('currentUser: ', currentUser);

  if (!currentUser) {
    return next(
      new AppError(
        'The user that belong to this token does no longer exist',
        StatusCodes.FORBIDDEN,
        'Forbidden'
      )
    );
  }

  console.log('req-user: ', req.body);
  req.user = currentUser;
  console.log('user-req: ', req.body);
  next();
});
