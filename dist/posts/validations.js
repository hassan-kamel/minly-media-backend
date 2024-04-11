"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.likeAndDislikeSchema = exports.deletePostSchema = exports.updatePostSchema = exports.createPostSchema = exports.getPostSchema = exports.getPaginatedPostsSchema = void 0;
const zod_1 = require("zod");
exports.getPaginatedPostsSchema = zod_1.z.object({
    query: zod_1.z.object({
        pageNumber: zod_1.z
            .string({
            required_error: 'Page Number is required'
        })
            .regex(/^[1-9]\d*$/, 'Page Number must be a number'),
        pageSize: zod_1.z
            .string({
            required_error: 'Page Size is required'
        })
            .regex(/^[1-9]\d*$/, 'Page Size must be a number')
    })
});
exports.getPostSchema = zod_1.z.object({
    params: zod_1.z.object({
        id: zod_1.z
            .string({
            required_error: 'Post id is required'
        })
            .uuid({
            message: 'Not a valid id'
        })
    })
});
exports.createPostSchema = zod_1.z.object({
    body: zod_1.z.object({
        caption: zod_1.z
            .string({
            required_error: 'Caption is required'
        })
            .max(500, 'Caption Maximum length is 500 characters'),
        media: zod_1.z.any({
            required_error: 'Media is required'
        })
    })
});
exports.updatePostSchema = zod_1.z.object({
    body: zod_1.z.object({
        caption: zod_1.z
            .string({
            required_error: 'Caption is required'
        })
            .max(500, 'Caption Maximum length is 500 characters')
    }),
    params: zod_1.z.object({
        id: zod_1.z
            .string({
            required_error: 'Post id is required'
        })
            .uuid({
            message: 'Not a valid id'
        })
    })
});
exports.deletePostSchema = zod_1.z.object({
    params: zod_1.z.object({
        id: zod_1.z
            .string({
            required_error: 'Post id is required'
        })
            .uuid({
            message: 'Not a valid id'
        })
    })
});
exports.likeAndDislikeSchema = exports.deletePostSchema;
//# sourceMappingURL=validations.js.map