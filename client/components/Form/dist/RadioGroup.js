"use strict";
exports.__esModule = true;
var react_1 = require("react");
var RadioGroup = function (_a) {
    var labelText = _a.labelText, children = _a.children;
    return (react_1["default"].createElement("div", null,
        labelText && (react_1["default"].createElement("label", { className: "block text-gray-600 mb-2 text-xs lg:text-sm xl:text-base" }, labelText)),
        react_1["default"].createElement("div", { className: "flex justify-evenly" }, children)));
};
exports["default"] = RadioGroup;
