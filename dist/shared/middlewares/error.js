"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.globalError = void 0;
const globalError = (err, req, res, next) => {
    console.log('err: ', err);
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'Error';
    //   const error = { ...err, status, statusCode };
    //   console.log('error: ', error);
    return res.status(err.statusCode).json({
        status: err.status,
        error: err,
        message: err.message,
        stack: err.stack
    });
};
exports.globalError = globalError;
//# sourceMappingURL=error.js.map