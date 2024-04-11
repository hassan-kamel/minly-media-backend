import { Request, Response } from 'express';
import { tryCatch } from '../../shared/middlewares/tryCatch';
import { prisma } from '../../shared/utils/prismaClient';
import { StatusCodes } from '../../shared/utils/StatusCodes';

export const likePost = tryCatch(async (req: Request, res: Response) => {
  const { id } = req.params;
  const { id: userId } = req.user!;
  const post = await prisma.post.update({
    where: { id },
    data: { likedBy: { connect: { id: userId } } },
    include: { likedBy: true }
  });
  res.status(StatusCodes.OK).json({ post });
});
