"use strict";
exports.__esModule = true;
exports.FormErrorMessage = void 0;
var react_1 = require("react");
var classnames_1 = require("classnames");
exports.FormErrorMessage = function (_a) {
    var children = _a.children, className = _a.className;
    return (react_1["default"].createElement("p", { className: classnames_1["default"]('font-serif text-sm text-left block text-red-600', className) }, children));
};
