"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postRouter = void 0;
const express_1 = require("express");
const middlewares_1 = require("../shared/middlewares");
const controllers_1 = require("./controllers");
const validations_1 = require("./validations");
const protect_1 = require("../shared/middlewares/protect");
const upload_1 = require("../shared/middlewares/upload");
exports.postRouter = (0, express_1.Router)();
exports.postRouter
    .get('/', (0, middlewares_1.validate)(validations_1.getPaginatedPostsSchema), controllers_1.getPosts)
    .get('/:id', (0, middlewares_1.validate)(validations_1.getPostSchema), controllers_1.getPost)
    .post('/', protect_1.protect, upload_1.upload.single('media'), (0, middlewares_1.validate)(validations_1.createPostSchema), controllers_1.createPost)
    .put('/:id', protect_1.protect, (0, middlewares_1.validate)(validations_1.updatePostSchema), controllers_1.updatePost)
    .delete('/:id', protect_1.protect, (0, middlewares_1.validate)(validations_1.deletePostSchema), controllers_1.deletePost)
    //  user interactions
    .post('/like/:id', (0, middlewares_1.validate)(validations_1.likeAndDislikeSchema), protect_1.protect, controllers_1.likePost)
    .post('/dislike/:id', (0, middlewares_1.validate)(validations_1.likeAndDislikeSchema), protect_1.protect, controllers_1.dislikePost);
//# sourceMappingURL=routes.js.map