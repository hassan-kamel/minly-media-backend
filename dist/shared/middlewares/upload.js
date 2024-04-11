"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.upload = void 0;
const multer_1 = __importDefault(require("multer"));
const AppError_1 = __importDefault(require("../utils/AppError"));
const StatusCodes_1 = require("../utils/StatusCodes");
// Store files in memory
const storage = multer_1.default.memoryStorage();
// Initialize multer with options
exports.upload = (0, multer_1.default)({
    storage: storage,
    fileFilter: (req, file, cb) => {
        console.log('file: ', file);
        // Check file type
        if (file.mimetype === 'image/jpeg' ||
            file.mimetype === 'image/png' ||
            file.mimetype === 'video/mp4' ||
            file.mimetype === 'video/mkv') {
            // Accept the file
            cb(null, true);
        }
        else {
            // Reject the file
            cb(new AppError_1.default('Invalid file type. Only images (JPEG, PNG) and videos (MP4,mkv) are allowed.', StatusCodes_1.StatusCodes.BAD_REQUEST, 'Invalid file type'));
        }
    },
    limits: {
        fileSize: 1024 * 1024 * 100 // 100 MB max file size
    }
});
//# sourceMappingURL=upload.js.map