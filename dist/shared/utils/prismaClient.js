"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.prisma = void 0;
const client_1 = require("@prisma/client");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
exports.prisma = new client_1.PrismaClient().$extends({
    query: {
        user: {
            async create({ model, operation, args, query }) {
                args.data.password = await bcryptjs_1.default.hash(args.data.password, 12);
                return query(args);
            }
        }
    }
});
//# sourceMappingURL=prismaClient.js.map