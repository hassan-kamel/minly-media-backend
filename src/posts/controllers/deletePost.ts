import { DeleteObjectCommand } from '@aws-sdk/client-s3';
import { tryCatch } from '../../shared/middlewares/tryCatch';
import { prisma } from '../../shared/utils/prismaClient';
import { s3Client, bucketName } from '../../shared/utils/s3Client';
import { StatusCodes } from '../../shared/utils/StatusCodes';
import { Request, Response } from 'express';

export const deletePost = tryCatch(async (req: Request, res: Response) => {
  const { id } = req.params;
  const post = await prisma.post.findUnique({ where: { id } });
  // Delete the post from S3
  const mediaName = post!.mediaUrl;
  await s3Client.send(new DeleteObjectCommand({ Bucket: bucketName, Key: mediaName }));
  // Delete the post from the database
  const deletedPost = await prisma.post.delete({ where: { id } });
  res.status(StatusCodes.OK).json({ deletedPost });
});
