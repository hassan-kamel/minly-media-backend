"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createPost = void 0;
const client_s3_1 = require("@aws-sdk/client-s3");
const mediaType_1 = require("../../shared/enums/mediaType");
const tryCatch_1 = require("../../shared/middlewares/tryCatch");
const prismaClient_1 = require("../../shared/utils/prismaClient");
const s3Client_1 = require("../../shared/utils/s3Client");
const StatusCodes_1 = require("../../shared/utils/StatusCodes");
const s3_request_presigner_1 = require("@aws-sdk/s3-request-presigner");
exports.createPost = (0, tryCatch_1.tryCatch)(async (req, res) => {
    console.log('req.file: ', req.file);
    console.log('req.body.user: ', req.body.user);
    const fileName = `${new Date().getTime()}-${req.file?.originalname}`;
    // Configure the upload details to send to S3
    const uploadParams = {
        Bucket: s3Client_1.bucketName,
        Body: req.file?.buffer,
        Key: fileName,
        ContentType: req.file?.mimetype
    };
    // Send the upload to S3
    await s3Client_1.s3Client.send(new client_s3_1.PutObjectCommand(uploadParams));
    // Create the post metadata in the database
    const post = await prismaClient_1.prisma.post.create({
        data: {
            caption: req.body.caption,
            mediaUrl: fileName,
            type: ['video/mp4', 'video/mkv'].includes(req.file.mimetype)
                ? mediaType_1.MediaTypeEnum.VIDEO
                : mediaType_1.MediaTypeEnum.IMAGE,
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
    const tempUrl = await (0, s3_request_presigner_1.getSignedUrl)(s3Client_1.s3Client, new client_s3_1.GetObjectCommand({
        Bucket: s3Client_1.bucketName,
        Key: mediaName
    }));
    res.status(StatusCodes_1.StatusCodes.CREATED).json({ ...post, mediaUrl: tempUrl });
});
//# sourceMappingURL=createPost.js.map