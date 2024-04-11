"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPost = void 0;
const client_s3_1 = require("@aws-sdk/client-s3");
const s3_request_presigner_1 = require("@aws-sdk/s3-request-presigner");
const tryCatch_1 = require("../../shared/middlewares/tryCatch");
const prismaClient_1 = require("../../shared/utils/prismaClient");
const s3Client_1 = require("../../shared/utils/s3Client");
const StatusCodes_1 = require("../../shared/utils/StatusCodes");
exports.getPost = (0, tryCatch_1.tryCatch)(async (req, res) => {
    const { id } = req.params;
    const post = await prismaClient_1.prisma.post.findUnique({
        where: { id },
        include: { author: true, likedBy: true }
    });
    // generate signed url for the post
    const mediaName = post?.mediaUrl;
    const tempUrl = await (0, s3_request_presigner_1.getSignedUrl)(s3Client_1.s3Client, new client_s3_1.GetObjectCommand({
        Bucket: s3Client_1.bucketName,
        Key: mediaName
    }));
    const postResponse = { ...post, mediaUrl: tempUrl };
    console.log('postResponse: ', postResponse);
    res.status(StatusCodes_1.StatusCodes.OK).json({ post: postResponse });
});
//# sourceMappingURL=getPost.js.map