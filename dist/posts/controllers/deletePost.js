"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletePost = void 0;
const client_s3_1 = require("@aws-sdk/client-s3");
const tryCatch_1 = require("../../shared/middlewares/tryCatch");
const prismaClient_1 = require("../../shared/utils/prismaClient");
const s3Client_1 = require("../../shared/utils/s3Client");
const StatusCodes_1 = require("../../shared/utils/StatusCodes");
exports.deletePost = (0, tryCatch_1.tryCatch)(async (req, res) => {
    const { id } = req.params;
    const post = await prismaClient_1.prisma.post.findUnique({ where: { id } });
    // Delete the post from S3
    const mediaName = post.mediaUrl;
    await s3Client_1.s3Client.send(new client_s3_1.DeleteObjectCommand({ Bucket: s3Client_1.bucketName, Key: mediaName }));
    // Delete the post from the database
    const deletedPost = await prismaClient_1.prisma.post.delete({ where: { id } });
    res.status(StatusCodes_1.StatusCodes.OK).json({ deletedPost });
});
//# sourceMappingURL=deletePost.js.map