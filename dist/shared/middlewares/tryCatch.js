"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.tryCatch = void 0;
const StatusCodes_1 = require("../utils/StatusCodes");
const AppError_1 = __importDefault(require("../utils/AppError"));
const tryCatch = (controller) => {
    return (req, res, next) => {
        try {
            controller(req, res, next);
        }
        catch (error) {
            return next(new AppError_1.default('Internal server error', StatusCodes_1.StatusCodes.INTERNAL_SERVER_ERROR, error));
        }
    };
};
exports.tryCatch = tryCatch;
//# sourceMappingURL=tryCatch.js.map