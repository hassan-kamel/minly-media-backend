import express, { Request, Response } from 'express';
import { configDotenv } from 'dotenv';
import path from 'path';
import cors from 'cors';

// Local Imports
import { globalError } from './shared/middlewares';
import { authRouter } from './auth/routes';
import { prisma } from './shared/utils/prismaClient';
import AppError from './shared/utils/AppError';
import { StatusCodes } from './shared/utils/StatusCodes';
import { postRouter } from './posts/routes';
import { IUser } from './shared/interfaces/user';
declare module 'express-serve-static-core' {
  interface Request {
    user?: IUser;
  }
}

configDotenv({ path: '.env' });
const port = process.env.PORT || 6000;
// Express
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
//  Welcome page
app.get('/', (req: Request, res: Response) => {
  console.log('__dirname: ', __dirname);
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

app.get('/api', async (req: Request, res: Response) => {
  const allPostsWithUsers = await prisma.post.findMany({
    include: { author: true }
  });
  console.log('allPostsWithUsers: ', allPostsWithUsers);
  res.json({
    message: 'Hello World',
    posts: allPostsWithUsers
  });
});

app.use('/api/auth', authRouter);
app.use('/api/post', postRouter);

app.all('*', (req, res, next) => {
  next(
    new AppError(`Can't find this route: ${req.originalUrl}`, StatusCodes.NOT_FOUND, 'Not Found')
  );
});

// Error middleware
app.use(globalError);

app.listen(port, () => {
  console.log(`app is  listening on port ${port}`);
});
