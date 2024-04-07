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
const auth_1 = require("./auth");
const prismaClient_1 = require("./shared/utils/prismaClient");
const AppError_1 = __importDefault(require("./shared/utils/AppError"));
const StatusCodes_1 = require("./shared/utils/StatusCodes");
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
        include: { user: true }
    });
    console.log('allPostsWithUsers: ', allPostsWithUsers);
    res.json({
        message: 'Hello World',
        posts: allPostsWithUsers
    });
});
app.use('/api/auth', auth_1.authRouter);
// (async function name() {
//   const newUser = await prisma.user.create({
//     data: {
//       fullName: 'John Doe',
//       email: 'john@example.com',
//       password: 'password123',
//     },
//   });
//   // Create a post for the user
//   const newPost = await prisma.post.create({
//     data: {
//       caption: 'Hello, world!',
//       mediaUrl: 'https://example.com/image.jpg',
//       type: 'IMAGE',
//       userId: newUser.id,
//     },
//   });
//   console.log('User created:', newUser);
//   console.log('Post created:', newPost);
// })();
// app.use('/api/v1', routes);
// catch all
app.all('*', (req, res, next) => {
    next(new AppError_1.default(`Can't find this route: ${req.originalUrl}`, StatusCodes_1.StatusCodes.NOT_FOUND, 'Not Found'));
});
// Error middleware
app.use(middlewares_1.globalError);
app.listen(port, () => {
    console.log(`app is  listening on port ${port}`);
});
//# sourceMappingURL=app.js.map