"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.globalError = void 0;
const multer_1 = __importDefault(require("multer"));
const StatusCodes_1 = require("../utils/StatusCodes");
const globalError = (err, req, res) => {
    console.log('err: ', err);
    if (err instanceof multer_1.default.MulterError) {
        return res.status(StatusCodes_1.StatusCodes.BAD_REQUEST).json({
            error: err,
            message: 'file size limit exceeded, maximum file size is 100MB',
            stack: err.stack
        });
    }
    return res.status(err.statusCode).json({
        error: err,
        message: err.message,
        stack: err.stack
    });
};
exports.globalError = globalError;
//# sourceMappingURL=error.js.map