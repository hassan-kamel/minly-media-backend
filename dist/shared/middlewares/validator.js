"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validate = void 0;
const StatusCodes_1 = require("../utils/StatusCodes");
const AppError_1 = __importDefault(require("../utils/AppError"));
const validate = (schema) => async (req, res, next) => {
    try {
        await schema.parseAsync({
            body: req.body,
            query: req.query,
            params: req.params
        });
        return next();
    }
    catch (error) {
        console.log('error: ', error);
        return next(new AppError_1.default('Validation error', StatusCodes_1.StatusCodes.BAD_REQUEST, error.issues));
    }
};
exports.validate = validate;
//# sourceMappingURL=validator.js.map