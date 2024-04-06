"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRouter = void 0;
const express_1 = require("express");
const middlewares_1 = require("../shared/middlewares");
const controllers_1 = require("./controllers");
const validations_1 = require("./validations");
exports.authRouter = (0, express_1.Router)();
exports.authRouter.post('/signup', (0, middlewares_1.validate)(validations_1.signupDataSchema), controllers_1.signup);
exports.authRouter.post('/login', (0, middlewares_1.validate)(validations_1.loginDataSchema), controllers_1.login);
//# sourceMappingURL=routes.js.map