import { GetObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { tryCatch } from '../../shared/middlewares/tryCatch';
import { prisma } from '../../shared/utils/prismaClient';
import { s3Client, bucketName } from '../../shared/utils/s3Client';
import { StatusCodes } from '../../shared/utils/StatusCodes';
import { Request, Response } from 'express';

export const getPosts = tryCatch(async (req: Request, res: Response) => {
  console.log('req.file: ', req.file);

  // pagination payload
  const { pageNumber, pageSize } = req.query;
  const skip = (Number(pageNumber) - 1) * Number(pageSize);
  const take = Number(pageSize);

  // Get all posts from the database
  const posts = await prisma.post.findMany({
    orderBy: [{ createdAt: 'desc' }],
    select: {
      id: true,
      caption: true,
      mediaUrl: true,
      createdAt: true,
      type: true,
      likedBy: {
        select: {
          id: true,
          fullName: true
        }
      },
      author: {
        select: {
          id: true,
          fullName: true
        }
      }
    },
    skip,
    take
  });

  const total = await prisma.post.count();

  // For each post, generate a signed URL and save it to the new object
  const postsResponse: typeof posts = [];

  for (const post of posts) {
    const mediaName = post.mediaUrl;

    const tempUrl = await getSignedUrl(
      s3Client,
      new GetObjectCommand({
        Bucket: bucketName,
        Key: mediaName
      }),
      { expiresIn: 60 * 60 * 24 } // full day - 24 hours
    );

    console.log('post: ', post);
    console.log('tempUrl: ', tempUrl);
    postsResponse.push({ ...post, mediaUrl: tempUrl });
  }

  console.log('postsResponse: ', postsResponse);
  res.status(StatusCodes.OK).json({ total, data: postsResponse });
});
