"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPosts = void 0;
const client_s3_1 = require("@aws-sdk/client-s3");
const s3_request_presigner_1 = require("@aws-sdk/s3-request-presigner");
const tryCatch_1 = require("../../shared/middlewares/tryCatch");
const prismaClient_1 = require("../../shared/utils/prismaClient");
const s3Client_1 = require("../../shared/utils/s3Client");
const StatusCodes_1 = require("../../shared/utils/StatusCodes");
exports.getPosts = (0, tryCatch_1.tryCatch)(async (req, res) => {
    console.log('req.file: ', req.file);
    // pagination payload
    const { pageNumber, pageSize } = req.query;
    const skip = (Number(pageNumber) - 1) * Number(pageSize);
    const take = Number(pageSize);
    // Get all posts from the database
    const posts = await prismaClient_1.prisma.post.findMany({
        orderBy: [{ createdAt: 'desc' }],
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
        },
        skip,
        take
    });
    const total = await prismaClient_1.prisma.post.count();
    // For each post, generate a signed URL and save it to the new object
    const postsResponse = [];
    for (const post of posts) {
        const mediaName = post.mediaUrl;
        const tempUrl = await (0, s3_request_presigner_1.getSignedUrl)(s3Client_1.s3Client, new client_s3_1.GetObjectCommand({
            Bucket: s3Client_1.bucketName,
            Key: mediaName
        }), { expiresIn: 60 * 60 * 24 } // full day - 24 hours
        );
        console.log('post: ', post);
        console.log('tempUrl: ', tempUrl);
        postsResponse.push({ ...post, mediaUrl: tempUrl });
    }
    console.log('postsResponse: ', postsResponse);
    res.status(StatusCodes_1.StatusCodes.OK).json({ total, data: postsResponse });
});
//# sourceMappingURL=getPaginatedPosts.js.map