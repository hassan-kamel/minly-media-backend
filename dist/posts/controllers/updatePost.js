"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updatePost = void 0;
const tryCatch_1 = require("../../shared/middlewares/tryCatch");
const prismaClient_1 = require("../../shared/utils/prismaClient");
const StatusCodes_1 = require("../../shared/utils/StatusCodes");
exports.updatePost = (0, tryCatch_1.tryCatch)(async (req, res) => {
    const { id } = req.params;
    const { caption } = req.body;
    // Update the post in the database
    const post = await prismaClient_1.prisma.post.update({
        where: { id },
        data: { caption },
        select: { id: true, caption: true }
    });
    res.status(StatusCodes_1.StatusCodes.OK).json({ post });
});
//# sourceMappingURL=updatePost.js.map