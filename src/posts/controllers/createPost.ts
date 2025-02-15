import { GetObjectCommand, PutObjectCommand } from '@aws-sdk/client-s3';
import { MediaTypeEnum } from '../../shared/enums/mediaType';
import { tryCatch } from '../../shared/middlewares/tryCatch';
import { prisma } from '../../shared/utils/prismaClient';
import { bucketName, s3Client } from '../../shared/utils/s3Client';
import { StatusCodes } from '../../shared/utils/StatusCodes';
import { Request, Response } from 'express';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

export const createPost = tryCatch(async (req: Request, res: Response) => {
  console.log('req.file: ', req.file);
  console.log('req.body.user: ', req.body.user);

  const fileName = `${new Date().getTime()}-${req.file?.originalname}`;

  // Configure the upload details to send to S3
  const uploadParams = {
    Bucket: bucketName,
    Body: req.file?.buffer,
    Key: fileName,
    ContentType: req.file?.mimetype
  };

  // Send the upload to S3
  await s3Client.send(new PutObjectCommand(uploadParams));

  // Create the post metadata in the database
  const post = await prisma.post.create({
    data: {
      caption: req.body.caption,
      mediaUrl: fileName,
      type: ['video/mp4', 'video/mkv'].includes(req.file!.mimetype)
        ? MediaTypeEnum.VIDEO
        : MediaTypeEnum.IMAGE,
      author: { connect: { id: req.user?.id } }
    },
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
    }
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

  res.status(StatusCodes.CREATED).json({ ...post, mediaUrl: tempUrl });
});
