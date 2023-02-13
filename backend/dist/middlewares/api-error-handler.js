"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.apiErrorHandler = void 0;
const ApiError_1 = require("@/utils/ApiError");
const apiErrorHandler = (err, req, res, next) => {
    console.error(err);
    if (err instanceof ApiError_1.ApiError) {
        res.status(err.code).json(err.message);
        return;
    }
    res.status(500).json("something went wrong");
};
exports.apiErrorHandler = apiErrorHandler;
//# sourceMappingURL=api-error-handler.js.map