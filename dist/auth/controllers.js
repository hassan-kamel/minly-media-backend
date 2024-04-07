"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.signup = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const AppError_1 = __importDefault(require("../shared/utils/AppError"));
const createToken_1 = __importDefault(require("../shared/utils/createToken"));
const prismaClient_1 = require("../shared/utils/prismaClient");
const tryCatch_1 = require("../shared/middlewares/tryCatch");
const StatusCodes_1 = require("../shared/utils/StatusCodes");
const { compare } = bcryptjs_1.default;
exports.signup = (0, tryCatch_1.tryCatch)(async (req, res) => {
    // 1- Create user
    const { fullName, email, password } = req.body;
    const user = await prismaClient_1.prisma.user.create({
        data: {
            fullName,
            email,
            password
        }
    });
    console.log('user: ', user);
    // 2- Generate token
    const token = (0, createToken_1.default)(user);
    res.status(201).json({ user: { ...user, password: undefined }, token });
});
exports.login = (0, tryCatch_1.tryCatch)(async (req, res, next) => {
    const { email, password } = req.body;
    // 2) check if user exist & check if password is correct
    const user = await prismaClient_1.prisma.user.findUnique({ where: { email } });
    console.log('user: ', user);
    if (!user || !(await compare(password, user.password))) {
        return next(new AppError_1.default('Incorrect email or password', StatusCodes_1.StatusCodes.UNAUTHORIZED, 'wrong credentials'));
    }
    // 3) generate token
    const token = (0, createToken_1.default)(user);
    // 4) send response to client side
    res.status(200).json({ user: { ...user, password: undefined }, token });
});
//# sourceMappingURL=controllers.js.map