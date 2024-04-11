import { Router } from 'express';
import { validate } from '../shared/middlewares';
import {
  createPost,
  deletePost,
  dislikePost,
  getPosts,
  getPost,
  likePost,
  updatePost
} from './controllers';
import {
  createPostSchema,
  deletePostSchema,
  getPaginatedPostsSchema,
  getPostSchema,
  likeAndDislikeSchema,
  updatePostSchema
} from './validations';
import { protect } from '../shared/middlewares/protect';
import { upload } from '../shared/middlewares/upload';

export const postRouter = Router();

postRouter
  .get('/', validate(getPaginatedPostsSchema), getPosts)
  .get('/:id', validate(getPostSchema), getPost)
  .post('/', protect, upload.single('media'), validate(createPostSchema), createPost)
  .put('/:id', protect, validate(updatePostSchema), updatePost)
  .delete('/:id', protect, validate(deletePostSchema), deletePost)
  //  user interactions
  .post('/like/:id', validate(likeAndDislikeSchema), protect, likePost)
  .post('/dislike/:id', validate(likeAndDislikeSchema), protect, dislikePost);
