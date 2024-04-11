import { GetObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { tryCatch } from '../../shared/middlewares/tryCatch';
import { prisma } from '../../shared/utils/prismaClient';
import { s3Client, bucketName } from '../../shared/utils/s3Client';
import { StatusCodes } from '../../shared/utils/StatusCodes';
import { Request, Response } from 'express';

export const getPost = tryCatch(async (req: Request, res: Response) => {
  const { id } = req.params;
  const post = await prisma.post.findUnique({
    where: { id },
    include: { author: true, likedBy: true }
  });
  // generate signed url for the post
  const mediaName = post?.mediaUrl;
  const tempUrl = await getSignedUrl(
    s3Client,
    new GetObjectCommand({
      Bucket: bucketName,
      Key: mediaName
    })
  );
  const postResponse = { ...post, mediaUrl: tempUrl };
  console.log('postResponse: ', postResponse);
  res.status(StatusCodes.OK).json({ post: postResponse });
});
