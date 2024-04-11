import { z } from 'zod';

export const getPaginatedPostsSchema = z.object({
  query: z.object({
    pageNumber: z
      .string({
        required_error: 'Page Number is required'
      })
      .regex(/^[1-9]\d*$/, 'Page Number must be a number'),
    pageSize: z
      .string({
        required_error: 'Page Size is required'
      })
      .regex(/^[1-9]\d*$/, 'Page Size must be a number')
  })
});

export const getPostSchema = z.object({
  params: z.object({
    id: z
      .string({
        required_error: 'Post id is required'
      })
      .uuid({
        message: 'Not a valid id'
      })
  })
});

export const createPostSchema = z.object({
  body: z.object({
    caption: z
      .string({
        required_error: 'Caption is required'
      })
      .max(500, 'Caption Maximum length is 500 characters'),
    media: z.any({
      required_error: 'Media is required'
    })
  })
});

export const updatePostSchema = z.object({
  body: z.object({
    caption: z
      .string({
        required_error: 'Caption is required'
      })
      .max(500, 'Caption Maximum length is 500 characters')
  }),
  params: z.object({
    id: z
      .string({
        required_error: 'Post id is required'
      })
      .uuid({
        message: 'Not a valid id'
      })
  })
});

export const deletePostSchema = z.object({
  params: z.object({
    id: z
      .string({
        required_error: 'Post id is required'
      })
      .uuid({
        message: 'Not a valid id'
      })
  })
});

export const likeAndDislikeSchema = deletePostSchema;
