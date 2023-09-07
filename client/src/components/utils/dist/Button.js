'use client';
"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
exports.__esModule = true;
exports.PageButton = exports.Button = void 0;
var react_1 = require("react");
var classNames_1 = require("./classNames");
function Button(_a) {
    var children = _a.children, className = _a.className, rest = __rest(_a, ["children", "className"]);
    return (react_1["default"].createElement("button", __assign({ type: "button", className: classNames_1["default"]("relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50", className) }, rest), children));
}
exports.Button = Button;
function PageButton(_a) {
    var children = _a.children, className = _a.className, rest = __rest(_a, ["children", "className"]);
    return (react_1["default"].createElement("button", __assign({ type: "button", className: classNames_1["default"]("relative inline-flex items-center px-2 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50", className) }, rest), children));
}
exports.PageButton = PageButton;
