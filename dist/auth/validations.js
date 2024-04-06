"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginDataSchema = exports.signupDataSchema = void 0;
const zod_1 = require("zod");
exports.signupDataSchema = zod_1.z.object({
    body: zod_1.z.object({
        fullName: zod_1.z
            .string({
            required_error: 'Full name is required',
        })
            .min(5, 'Full name Minimum length is 5 characters')
            .max(32, 'Full name Maximum length is 32 Characters'),
        email: zod_1.z
            .string({
            required_error: 'Email is required',
        })
            .email('Not a valid email'),
        password: zod_1.z
            .string({
            required_error: 'Password is required',
        })
            .min(8, 'Password Minimum length is 8 characters'),
    }),
});
exports.loginDataSchema = zod_1.z.object({
    body: zod_1.z.object({
        email: zod_1.z
            .string({
            required_error: 'Email is required',
        })
            .email('Not a valid email'),
        password: zod_1.z
            .string({
            required_error: 'Password is required',
        })
            .min(8, 'Password Minimum length is 8 characters'),
    }),
});
//# sourceMappingURL=validations.js.map