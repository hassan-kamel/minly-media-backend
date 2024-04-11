"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = require("dotenv");
const path_1 = __importDefault(require("path"));
const cors_1 = __importDefault(require("cors"));
// Local Imports
const middlewares_1 = require("./shared/middlewares");
const routes_1 = require("./auth/routes");
const prismaClient_1 = require("./shared/utils/prismaClient");
const AppError_1 = __importDefault(require("./shared/utils/AppError"));
const StatusCodes_1 = require("./shared/utils/StatusCodes");
const routes_2 = require("./posts/routes");
(0, dotenv_1.configDotenv)({ path: '.env' });
const port = process.env.PORT || 6000;
// Express
const app = (0, express_1.default)();
// Middleware
app.use((0, cors_1.default)());
app.use(express_1.default.json());
//  Welcome page
app.get('/', (req, res) => {
    console.log('__dirname: ', __dirname);
    res.sendFile(path_1.default.join(__dirname, '../public/index.html'));
});
app.get('/api', async (req, res) => {
    const allPostsWithUsers = await prismaClient_1.prisma.post.findMany({
        include: { author: true }
    });
    console.log('allPostsWithUsers: ', allPostsWithUsers);
    res.json({
        message: 'Hello World',
        posts: allPostsWithUsers
    });
});
app.use('/api/auth', routes_1.authRouter);
app.use('/api/post', routes_2.postRouter);
app.all('*', (req, res, next) => {
    next(new AppError_1.default(`Can't find this route: ${req.originalUrl}`, StatusCodes_1.StatusCodes.NOT_FOUND, 'Not Found'));
});
// Error middleware
app.use(middlewares_1.globalError);
app.listen(port, () => {
    console.log(`app is  listening on port ${port}`);
});
//# sourceMappingURL=app.js.map