"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ErrorApi extends Error {
    statusCode;
    status;
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
        this.status = `${statusCode}`.startsWith('4') ? 'failed' : 'error';
    }
}
exports.default = ErrorApi;
//# sourceMappingURL=errorApi.js.map