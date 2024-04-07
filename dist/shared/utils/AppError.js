"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class AppError extends Error {
    statusCode;
    status;
    error;
    constructor(message, statusCode, error) {
        super(message);
        this.statusCode = statusCode;
        this.status = `${statusCode}`.startsWith('4') ? 'failed' : 'error';
        this.error = error;
    }
}
exports.default = AppError;
//# sourceMappingURL=AppError.js.map