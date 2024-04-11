"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.protect = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const AppError_1 = __importDefault(require("../utils/AppError"));
const tryCatch_1 = require("./tryCatch");
const prismaClient_1 = require("../utils/prismaClient");
const StatusCodes_1 = require("../utils/StatusCodes");
exports.protect = (0, tryCatch_1.tryCatch)(async (req, res, next) => {
    console.log('req.body: ', req.body);
    console.log('req.file: ', req.file);
    // 1) Check if token exist, if exist get
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
    }
    console.log('token: ', token);
    if (!token || token === 'null' || token === 'undefined') {
        return next(new AppError_1.default('Please login or create an account', StatusCodes_1.StatusCodes.UNAUTHORIZED, 'Unauthorized'));
    }
    // 2) Verify token (no change happens, expired token)
    const decoded = await jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET_KEY);
    console.log('decoded: ', decoded);
    // 3) Check if user exists
    const currentUser = await prismaClient_1.prisma.user.findUnique({
        where: { id: decoded.id }
    });
    console.log('currentUser: ', currentUser);
    if (!currentUser) {
        return next(new AppError_1.default('The user that belong to this token does no longer exist', StatusCodes_1.StatusCodes.FORBIDDEN, 'Forbidden'));
    }
    console.log('req-user: ', req.body);
    req.user = currentUser;
    console.log('user-req: ', req.body);
    next();
});
//# sourceMappingURL=protect.js.map