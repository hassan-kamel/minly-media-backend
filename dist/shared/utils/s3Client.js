"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.s3Client = exports.bucketName = void 0;
const client_s3_1 = require("@aws-sdk/client-s3");
const dotenv_1 = require("dotenv");
(0, dotenv_1.configDotenv)({ path: '.env' });
exports.bucketName = process.env.AWS_BUCKET_NAME;
const region = process.env.AWS_BUCKET_REGION;
console.log('region: ', region);
const accessKeyId = process.env.AWS_ACCESS_KEY;
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;
exports.s3Client = new client_s3_1.S3Client({
    region,
    credentials: {
        accessKeyId: accessKeyId,
        secretAccessKey: secretAccessKey
    }
});
//# sourceMappingURL=s3Client.js.map