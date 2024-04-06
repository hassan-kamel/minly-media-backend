import express, { Request, Response } from 'express';
import { configDotenv } from 'dotenv';
import path from 'path';
import cors from 'cors';

// Local Imports
import { globalError } from './shared/middlewares';
import { authRouter } from './auth';
import { prisma } from './shared/utils/prismaClient';
import ErrorApi from './shared/utils/errorApi';

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
    include: { user: true }
  });
  console.log('allPostsWithUsers: ', allPostsWithUsers);
  res.json({
    message: 'Hello World',
    posts: allPostsWithUsers
  });
});

app.use('/api/auth', authRouter);

// (async function name() {
//   const newUser = await prisma.user.create({
//     data: {
//       fullName: 'John Doe',
//       email: 'john@example.com',
//       password: 'password123',
//     },
//   });

//   // Create a post for the user
//   const newPost = await prisma.post.create({
//     data: {
//       caption: 'Hello, world!',
//       mediaUrl: 'https://example.com/image.jpg',
//       type: 'IMAGE',
//       userId: newUser.id,
//     },
//   });
//   console.log('User created:', newUser);
//   console.log('Post created:', newPost);
// })();

// app.use('/api/v1', routes);

// catch all
app.all('*', (req, res, next) => {
  next(new ErrorApi(`Can't find this route: ${req.originalUrl}`, 400));
});
// Error middleware
app.use(globalError);

app.listen(port, () => {
  console.log(`app is  listening on port ${port}`);
});
