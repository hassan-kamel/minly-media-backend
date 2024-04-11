"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dislikePost = void 0;
const tryCatch_1 = require("../../shared/middlewares/tryCatch");
const prismaClient_1 = require("../../shared/utils/prismaClient");
const StatusCodes_1 = require("../../shared/utils/StatusCodes");
exports.dislikePost = (0, tryCatch_1.tryCatch)(async (req, res) => {
    const { id } = req.params;
    const { id: userId } = req.user;
    const post = await prismaClient_1.prisma.post.update({
        where: { id },
        data: { likedBy: { disconnect: { id: userId } } },
        include: { likedBy: true }
    });
    res.status(StatusCodes_1.StatusCodes.OK).json({ post });
});
//# sourceMappingURL=dislikePost.js.map