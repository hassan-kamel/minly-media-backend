"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const createToken = (payload) => {
    console.log('process.env.JWT_SECRET_KEY: ', process.env.JWT_SECRET_KEY);
    console.log('process.env.JWT_EXPIRE_TIME: ', process.env.JWT_EXPIRE_TIME);
    return jsonwebtoken_1.default.sign({ ...payload }, process.env.JWT_SECRET_KEY, {
        expiresIn: process.env.JWT_EXPIRE_TIME
    });
};
exports.default = createToken;
//# sourceMappingURL=createToken.js.map