import express, { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { configDotenv } from 'dotenv';
// Local Imports
import { errorHandler } from './shared/middlewares';

configDotenv({ path: '.env' });
const port = process.env.PORT || 6000;
const prisma = new PrismaClient();
const app = express();

app.get('/', async (req: Request, res: Response) => {
  const allPostsWithUsers = await prisma.post.findMany({
    include: { user: true },
  });
  res.json({
    message: 'Hello World',
    posts: allPostsWithUsers,
  });
});

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

app.use(errorHandler);

app.listen(port, () => {
  console.log(`app is  listening on port ${port}`);
});
