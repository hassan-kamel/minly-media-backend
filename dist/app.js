"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const client_1 = require("@prisma/client");
const dotenv_1 = require("dotenv");
// Local Imports
const middlewares_1 = require("./shared/middlewares");
(0, dotenv_1.configDotenv)({ path: '.env' });
const port = process.env.PORT || 6000;
const prisma = new client_1.PrismaClient();
const app = (0, express_1.default)();
//  Welcome page
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});
app.get('/api', async (req, res) => {
    const allPostsWithUsers = await prisma.post.findMany({
        include: { user: true },
    });
    res.json({
        message: 'Hello World',
        posts: allPostsWithUsers,
    });
});
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
app.use(middlewares_1.errorHandler);
app.listen(port, () => {
    console.log(`app is  listening on port ${port}`);
});
//# sourceMappingURL=app.js.map