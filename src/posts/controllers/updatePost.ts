import { Request, Response } from 'express';
import { tryCatch } from '../../shared/middlewares/tryCatch';
import { prisma } from '../../shared/utils/prismaClient';
import { StatusCodes } from '../../shared/utils/StatusCodes';

export const updatePost = tryCatch(async (req: Request, res: Response) => {
  const { id } = req.params;
  const { caption } = req.body;

  // Update the post in the database
  const post = await prisma.post.update({
    where: { id },
    data: { caption },
    select: { id: true, caption: true }
  });
  res.status(StatusCodes.OK).json({ post });
});
