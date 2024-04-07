"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.globalError = void 0;
const globalError = (err, req, res, next) => {
    console.log('err: ', err);
    return res.status(err.statusCode).json({
        error: err,
        message: err.message,
        stack: err.stack
    });
};
exports.globalError = globalError;
//# sourceMappingURL=error.js.map